'use strict';

const debug = require('debug')('cfgram:gallery-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');
const galControl = require('../controller/gallery-controller');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');
    galControl.createNewGallery(req, res);
  });


  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');
    galControl.fetchGallery(req.params.id, req.user._id, res);
  });

  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id');
    galControl.updateGallery(req, res, req.body, req.params.id);
  });

  router.delete('/gallery/:id', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery/:id');
    galControl.deleteGallery(req, res, req.params.id);
  });

  return router;
};
