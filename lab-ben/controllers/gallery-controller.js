'use strict';

const createError = require('http-errors');
const Gallery = require('../models/gallery.js');
const debug = require('debug')('cfgram:gallery-controller');

module.exports = exports = {};

exports.addGallery = function(req) {
  req.body.userId = req.user_id;
  return new Gallery(req.body).save();
};

exports.findGallery = function(id) {
  Gallery.findById(id)
  .then(gallery => {
    if(gallery.userId.toString() !== id) {
      return createError(401, 'Invalid user');
    }
    return gallery;
  });
};
