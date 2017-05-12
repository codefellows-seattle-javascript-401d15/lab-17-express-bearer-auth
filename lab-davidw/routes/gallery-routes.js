'use strict';

const galleryCtrl = require('../controllers/gallery-controller');
const createError = require('http-errors');
const debug = require('debug')('cfgram:gallery-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {

  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');
    galleryCtrl.createGallery(req)
    .then(gallery => res.json(gallery))
    .catch((err) => res.status(err.status).send(err.message));

  });

  router.get('/gallery/:id'), bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');

    galleryCtrl.fetchGallery(req)
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid user');
      }
      res.json(gallery);
    })
    .catch(err => res.status(err.status)(err.message));
  };

  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery/:id');

    galleryCtrl.deleteGallery(req)
    .then(() => res.status(204).send())
    .catch(err => res.send(err));
  });

  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id');

    galleryCtrl.updateGallery(req.params.id)
    .then(gallery => res.json(gallery))
    .catch(err => res.send(err.status).send(err.message));
  });

  return router;
};