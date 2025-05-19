import AlbumModel from '../models/album.mjs';

const Albums = class Albums {
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);
    this.run();
  }

  showById() {
    this.app.get('/album/:id', (req, res) => {
      try {
        this.AlbumModel.findById(req.params.id)
          .populate('photos')
          .then((album) => {
            res.status(200).json(album || {});
          }).catch((err) => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server Error',
              error: err.message
            });
          });
      } catch (err) {
        console.error(`[ERROR] /album/:id -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
  

  create() {
    this.app.post('/album/', (req, res) => {
      try {
        const albumModel = new this.AlbumModel(req.body);

        albumModel.save().then((user) => {
          res.status(200).json(user || {});
        }).catch(() => {
          res.status(200).json({});
        });
      } catch (err) {
        console.error(`[ERROR] albums/create -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  update() {
    this.app.put('/album/:id', (req, res) => {
      try {
        // { new: true } permet de renvoyer l'album mis à jour
        this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then(albumUpdated => res.status(200).json(albumUpdated || {}))
          .catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] PUT /albums/:id -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  // DELETE /album/:id - Supprimer un album
  deleteById() {
    this.app.delete('/album/:id', (req, res) => {
      try {
        this.AlbumModel.findByIdAndDelete(req.params.id).then((album) => {
          res.status(200).json(album || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] delete albums/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  getList() {
    this.app.get('/albums', (req, res) => {
      try {
        const filter = {};
        if (req.query.title) {
          filter.title = { $regex: req.query.title, $options: 'i' };
        }
        this.AlbumModel.find(filter)
          .then(albums => res.status(200).json(albums || []))
          .catch((err) => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server Error',
              error: err.message
            });
          });
      } catch (err) {
        console.error(`[ERROR] GET /albums -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }
  

  run() {
    this.create();
    this.showById();
    this.update();
    this.deleteById();
    this.getList();
  }
};

export default Albums;
