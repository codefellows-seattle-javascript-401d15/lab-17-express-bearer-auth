'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Gallery = require('../models/gallery');
const debug = require('debug')('cfgram:gallery-controller');

module.exports = exports = {};

exports.createGallery = function(req) {
  debug('#createGallery');
  if(!req) return Promise.reject(createError(400, 'Bad request'));

  req.body.userId = req.user._id;
  return new Gallery(req.body).save()
  .then(gallery => gallery)
  .catch(err => createError(401, err.message));
};

exports.fetchGallery = function(req) {
  debug('#fetchGallery');
  if(!req.params.id) return Promise.reject(createError(400, 'Bad request'));
  console.log(req.params.id);

  return Gallery.findById(req.params.id)
  .then(gallery => {
    if(gallery.userId.toString() !== req.params.id.toString()) {
      return createError(401, 'Invalid user')
      .then(gallery => gallery)
      .catch(err => createError(401, err.message));
    }
  });
};

exports.deleteGallery = function(req) {
  console.log('IDIDID?!?!', req.ObjectId);
  debug('deleteGallery');
  if(!req.params.id) return Promise.reject(createError(400, 'bad request'));

  return Gallery.findByIdAndRemove(req.params.id);
};

exports.updateGallery = function(req) {
  debug('#updateGallery');
  if(!req.params.id) return Promise.reject(createError(400, 'Id required'));

  return Gallery.findOneAndUpdate(req.params.id, req.body, {new: true});
};
