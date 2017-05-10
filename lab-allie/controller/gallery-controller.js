'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Gallery = require('../models/gallery.js');

module.exports = exports = {};

exports.addPicture = function(req, res) {
  req.body.userId = req.user._id;
  
  new Gallery(req.body).save()
  .then(gallery => res.json(gallery))
  .then(gallery => console.log('gallery', res.json(gallery)))
  .catch(err => {
    console.log(err);
    res.status(err.status).send(err.message);
  });
};

exports.getPicture = function(req, res) {
  if(!req) return Promise.reject(createError(400, 'Track ID required'));
  
  Gallery.findById(req.params.id)
  .then(gallery => {
    if(gallery.userId.toString() !== req.user._id.toString()) {
      return createError(401, 'Invalid user');
    }
    res.json(gallery);
  })
  .catch(err => res.status(err.status).send(err.message));
};

exports.updatePicture = function(req, res) {
  if(!req) return Promise.reject(createError(400, 'Track ID required'));
  
  Gallery.findOneAndUpdate(req.params.id, req.body, {new: true})
  .then(pic => res.json(pic))
  .catch(err => res.status(400).send(err.message));
};

exports.deletePicture = function(req, res) {
  if(!req) return Promise.reject(createError(400, 'Track ID required'));

  Gallery.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};