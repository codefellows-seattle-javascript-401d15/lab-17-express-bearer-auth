'use strict';

const createError = require('http-errors');
const galleryController = require('../controllers/gallery-controller');
const debug = require('debug')('cfgram:gallery-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {

  router.post('/gallery', bearerAuth, (req, res) => {
    galleryController.createItem(req, res, req.body, req.user._id);
    debug('#POST /api/gallery');

  });

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');
    galleryController.fetchItem(req, res, req.params.id, req.user._id);
  });

  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery/:id');
    galleryController.deleteItem(req, res, req.params.id, req.user_id);
  });
  
  return router;
};
