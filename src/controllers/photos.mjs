import PhotoModel from '../models/photo.mjs';

const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/album/:idalbum/photo/:idphotos', (req, res) => {
      try {
        this.PhotoModel.findOneAndDelete({ _id: req.params.idphotos, albumId: req.params.idalbum })
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
        console.error(`[ERROR] DELETE /album/:idalbum/photo/:idphotos -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  // GET /album/:idalbum/photo/:idphotos - Récupérer une photo spécifique d'un album
  showById() {
    this.app.get('/album/:idalbum/photo/:idphotos', (req, res) => {
      try {
        this.PhotoModel.findOne({ _id: req.params.idphotos, albumId: req.params.idalbum })
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

  // POST /album/:idalbum/photo - Ajouter une nouvelle photo à un album
  create() {
    this.app.post('/album/:idalbum/photo', (req, res) => {
      try {
        const newPhoto = new this.PhotoModel({
          ...req.body,
          albumId: req.params.idalbum
        });

        newPhoto.save()
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
          { _id: req.params.idphotos, albumId: req.params.idalbum },
          req.body,
          { new: true } // Renvoie la version mise à jour de la photo
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
  showAllPhotos() {
    this.app.get('/album/:idalbum/photos', (req, res) => {
      try {
        this.PhotoModel.find({ albumId: req.params.idalbum })
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
