'use strict'

const Promise = require('bluebird')
const Gallery = require('../models/gallery.js')
const debug = require('debug')('cfgram:gallery-controller.js')
const createError = require('http-errors')
const mongoose = require('mongoose')
mongoose.Promise = Promise

module.exports = exports = {}

exports.createGallery = function(gallery){
  debug('#createGallery')
  if(!gallery) return Promise.reject(createError(400, '!!no gallery!!'))
  return new Gallery(gallery).save()
}

exports.fetchGallery = function(id){
  debug('#fetchGallery')
  if(!id) return Promise.reject(createError(400, '!!no id!!'))
  return Gallery.findOne(id)
}

exports.updateGallery = function(id, gallery){
  debug('#updateGallery')
  if(!id) return Promise.reject(createError(400, '!!no id!!'))
  if(!gallery) return Promise.reject(createError(400, '!!no gallery!!'))
  return Gallery.findByIdAndUpdate(id, gallery, {new: true})
}

exports.deleteGallery = function(id){
  debug('#deleteGallery')
  if(!id) return Promise.reject(createError(400, '!!no id, id required'))
  return Gallery.findByIdAndRemove(id)
}
