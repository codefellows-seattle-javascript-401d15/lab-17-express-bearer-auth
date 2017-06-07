'use strict';

const createError = require('http-errors');
const Gallery = require('../models/gallery');
const debug = require('debug')('cfgram:galler-routes');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const galleryController = require('../controllers/galleryController');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');

    req.body.userId = req.user._id;
    return galleryController.createGallery(req.body)
    .then(gallery => {
      res.json(gallery);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  });

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');

    return galleryController.fetchGallery(req.body.userId)
    .then(gallery => {
      res.json(gallery);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  });

  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id');

    return galleryController.updateGallery(req.body)
    .then(gallery => {
      res.json(gallery);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  });

  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery/:id');

    return galleryController.deleteGallery(req.body.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
  });

  return router;
};
