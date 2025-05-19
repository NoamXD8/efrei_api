import PhotoModel from '../models/photo.mjs';
import AlbumModel from '../models/album.mjs';


const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/album/:idalbum/photo/:idphotos', (req, res) => {
      try {
        this.PhotoModel.findOneAndDelete({
          _id: req.params.idphotos,
          album: req.params.idalbum
        })
          .then((photo) => {
            if (photo) {
              this.AlbumModel.findByIdAndUpdate(
                req.params.idalbum,
                { $pull: { photos: photo._id } }
              ).then(() => {
                res.status(200).json(photo);
              });
            } else {
              res.status(404).json({});
            }
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              message: 'Erreur suppression',
              error: err.message
            });
          });
      } catch (err) {
        console.error(`[ERROR] DELETE /album/:idalbum/photo/:idphotos -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
  

  // GET /album/:idalbum/photo/:idphotos - Récupérer une photo spécifique d'un album
  //GOOD
  showById() {
    this.app.get('/album/:idalbum/photo/:idphotos', (req, res) => {
      try {
        this.PhotoModel.findOne({ _id: req.params.idphotos, album: req.params.idalbum })
          .then((photo) => {
            res.status(200).json(photo || {});
          })
          .catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] GET /album/:idalbum/photo/:idphotos -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  create() {
    this.app.post('/album/:idalbum/photo', (req, res) => {
      try {
        const newPhoto = new this.PhotoModel({
          ...req.body,
          album: req.params.idalbum
        });
  
        newPhoto.save()
          .then((photo) => {
            this.AlbumModel.findByIdAndUpdate(
              req.params.idalbum,
              { $push: { photos: photo._id } },
              { new: true }
            ).then(() => {
              res.status(201).json(photo || {});
            });
          })
          .catch((err) => {
            res.status(500).json({
              code: 500,
              message: 'Erreur création photo',
              error: err.message
            });
          });
      } catch (err) {
        console.error(`[ERROR] POST /album/:idalbum/photo -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  // PUT /album/:idalbum/photo/:idphotos - Mettre à jour une photo existante dans un album
  update() {
    this.app.put('/album/:idalbum/photo/:idphotos', (req, res) => {
      try {
        this.PhotoModel.findOneAndUpdate(
          { _id: req.params.idphotos, album: req.params.idalbum },
          req.body,
          { new: true }
        )
          .then((updatedPhoto) => {
            res.status(200).json(updatedPhoto || {});
          })
          .catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] PUT /album/:idalbum/photo/:idphotos -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  // GET /album/:idalbum/photos - Récupérer toutes les photos d'un album
  //GOOD
  showAllPhotos() {
    this.app.get('/album/:idalbum/photos', (req, res) => {
      try {
        this.PhotoModel.find({ album: req.params.idalbum })
          .then((photos) => {
            res.status(200).json(photos || []);
          })
          .catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] GET /album/:idalbum/photos -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  // Méthode pour lancer toutes les routes
  run() {
    this.create();
    this.showById();
    this.update();
    this.deleteById();
    this.showAllPhotos();
  }
};

export default Photos;
