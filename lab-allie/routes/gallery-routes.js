'use strict';

const galleryCtrl = require('../controller/gallery-controller.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const debug = require('debug')('cfgram:user-model');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');
    galleryCtrl.addPicture(req, res);
  });
  
  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');
    galleryCtrl.getPicture(req, res, req.params.id, req.user._id);
  });
  
  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id');
    galleryCtrl.updatePicture(req, res, req.body, req.params.id);
  });
  
  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery/:id');
    galleryCtrl.deletePicture(req, res, req.params.id);
  });
  
  return router;
};