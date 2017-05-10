'use strict'

const debug = require('debug')('cfgram:auth-routes')
const Gallery = require('../models/gallery')

module.exports = exports = {}

exports.createGal = function(reqGal,reqUserId,res){
  reqGal.userId = reqUserId
  new Gallery(reqGal).save()
    .then(gallery => res.json(gallery))
    .catch(err => {
      console.log(err);
      res.status(err.status).send(err.message)
    })
}

exports.readGal = function(id,reqUserId,res){
  Gallery.findById(id)
    .then(gallery => {
      if(gallery.userId.toString() !== reqUserId.toString()){
        return createError(401, 'Invalid user')
      }
      res.json(gallery)
    })
    .catch(err => res.status(err.status).send(err.message))
}

exports.deleteGal = function(id,reqUserId,res){
  Gallery.findById(id)
    .then(gallery => {
      if(gallery.userId.toString() !== reqUserId.toString()){
        return createError(401, 'Invalid user')
      }
      gallery.findByIdAndRemove(id)
      res.json(gallery)
    })
    .catch(err => res.status(err.status).send(err.message))
}
