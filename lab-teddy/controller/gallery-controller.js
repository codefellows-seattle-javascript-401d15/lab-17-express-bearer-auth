'use strict';

const debug = require('debug')('cfgram:galler-controller.js');
const Gallery = require('../model/gallery');
const createError = require('http-errors');

module.exports = exports = {};

exports.createNewGallery = function(reqGaller, reqUserId, res){
  debug('#createNewGallery');

  reqGaller.userId = reqUserId;
  new Gallery(reqGaller).save()
  .then(gallery => res.json(gallery))
  .catch(err => {
    console.log(err);
    res.status(err.status).send(err.message);
  });
};

exports.fetchGallery = function(id, reqUserId, res){
  Gallery.findById(id)
  .then(gallery => {
    if(gallery.userId.toString() !== reqUserId.toString()) {
      return createError(401, 'Invalid user');
    }
    res.json(gallery);
  })
  .catch(err => res.status(err.status).send(err.message));
};

exports.updateGallery = function(req, res, reqGaller, userId){
  Gallery.findOneAndUpdate(userId, req.body, {new:true})
  .then(gallery => res.json(gallery))
  .catch(err => res.status(err.status).send(err.message));
};

exports.deleteGallery = function(req, res, userId){
  Gallery.findOneAndRemove(userId)
  .then(() => res.status(204).send())
  .catch(err => res.status(err.status).send(err.message));
};
