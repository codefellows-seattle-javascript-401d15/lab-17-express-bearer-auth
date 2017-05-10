'use strict';

const galleryCtrl = require('../controller/gallery-controller.js');
const basicAuth = require('../lib/basic-auth-middleware.js');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');
    galleryCtrl.addPicture(req, res);
  });
  
  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');
    galleryCtrl.getPicture(req.auth, res);
  });
  
  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id');
    galleryCtrl.updatePicture(req.auth, res);
  });
  
  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery/:id');
    galleryCtrl.deletePicture(req.auth, res);
  });
  
  return router;
};