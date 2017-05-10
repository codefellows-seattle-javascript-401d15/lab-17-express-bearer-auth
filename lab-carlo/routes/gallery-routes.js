'use strict';

//const createError = require('http-errors');
//const Gallery = require('../models/gallery');
const debug = require('debug')('cfgram:gallery-routes');
const bearerAuth = require('../lib/bearer-auth-middleware');
const galleryCntrl = require('../lib/bearer-controller');

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery');

    galleryCntrl.createGallery(req, res, req.body);


  });

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id');

    galleryCntrl.fetchGallery(res, req.bearer);
  });



  return router;
};
