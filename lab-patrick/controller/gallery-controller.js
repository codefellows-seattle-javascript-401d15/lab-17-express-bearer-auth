'use strict';

// const createError = require('http-errors');
const Gallery = require('../models/gallery');
// const debug = require('debug')('cfgram:gallery-routes');
// const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = exports ={};

exports.createItem = function(body, user){
  body.userId = user._id;
  return new Gallery(body).save()
  .then(gallery => gallery)
  .catch(err => body.status(err.status).send(err.message));

};

exports.fetchItem = function(id){
  return Gallery.findById(id)
  .then(gallery => gallery)
  .catch(err => id.status(err.status).send(err.message));
};

exports.updateItem = function(req, res, id){
  return Gallery.findByIdAndUpdate(id, req.body, {new:true})
  .then(gallery => gallery)
  .catch(err => res.status(err.status).send(err.message));
};
