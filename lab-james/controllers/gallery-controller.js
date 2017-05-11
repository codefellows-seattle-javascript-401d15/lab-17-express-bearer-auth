'use strict';

const debug = require('debug')('cfgram:gallery-controller');
const createError = require('http-errors');
const Promise = require('bluebird');
const Gallery = require('../models/gallery.js');

module.exports = exports = {};

exports.createGallery = function(data) {
  debug('#createGallery');

  return new Gallery(data).save();
};

exports.fetchGallery = function(id, userId) {
  debug('#fetchGallery');

  return Gallery.findById(id)
  .then(gallery => {
    if(gallery.userId !== userId) {
      return Promise.reject(createError(401, 'Invalid user Id.'));
    }
    return Promise.resolve(gallery);
  })
  .catch(err => {
    Promise.reject(err);
  });
};

exports.updateGallery = function(id, userId, data) {
  debug('#updateGallery');

  return Gallery.findByIdAndUpdate(id, data, {new:true})
  .then(gallery => {
    if(gallery.userId !== userId) {
      return Promise.reject(createError(401, 'Invlaid user Id.'));
    }
    return Promise.resolve(gallery);
  })
  .catch(err => {
    Promise.reject(err);
  });
};

exports.deleteGallery = function(id, userId) {
  debug('#deleteGallery');

  return Gallery.findByIdAndRemove(id)
  .then(gallery => {
    if(gallery.userId !== userId) {
      return Promise.reject(createError(401, 'Invlaid user Id'));
    }
  })
  .catch(err => {
    Promise.reject(err);
  });
};
