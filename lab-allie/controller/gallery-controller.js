'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const User = require('../models/server.js');

module.exports = exports = {};

exports.addPicture = function(req, res) {
  req.body.userId = req.user._id;
  
  new Gallery(req.body).save()
  .then(gallery => res.json(gallery))
  .catch(err => res.status(err.status).send(err.message));
};

exports.getPicture = function(reqAuth, res) {
  Gallery.findById(req.params.id)
  .then(gallery => {
    if(gallery.userId.toString() !== req.user._id.toString()) {
      return createError(401, 'Invalid user');
    }
    res.json(gallery);
  })
  .catch(err => res.status(err.status).send(err.message));
};

exports.updatePicture = function(reqAuth, res) {};

exports.deletePicture = function(reqAuth, res) {};