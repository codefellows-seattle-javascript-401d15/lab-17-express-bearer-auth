'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Gallery = require('../models/gallery');

module.exports = exports = {};

exports.createItem = function(req, res, gallery, userId) {

  if(!gallery) return Promise.reject(createError(400, 'bad request'));

  gallery.userId = userId;
  new Gallery(gallery).save()
  .then(gallery => res.json(gallery))
  .catch(err => {
    console.log(err);
  });
};
