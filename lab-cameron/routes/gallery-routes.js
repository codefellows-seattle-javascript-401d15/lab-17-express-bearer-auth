'use strict';

const debug = require('debug')('pokegram:gallery-routes');
const galleryController = require('../controllers/gallery-controller');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');

    req.body.userId = req.user._id;

    return galleryController.createGallery(req.body)
    .then(gallery => res.json(gallery))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');

    return galleryController.fetchUserGallery(req.params.id, req.user._id)
    .then(gallery => res.json(gallery))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};
