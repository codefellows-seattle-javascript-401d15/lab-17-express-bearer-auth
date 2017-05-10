const Promise = require('bluebird');
const Gallery = require('../model/gallery');
const createError = require('http-errors');


module.exports = exports = {};

exports.createGallery = function(req, res) {

  req.body.userId = req.user._id;
  new Gallery(req.body).save()
  .then(gallery => res.json(gallery))
  .catch(err => {
    console.log(err);
    res.status(err.status).send(err.message);
  });
};

exports.fetchGallery = function(res, req, bearer) {
  if(!bearer) return Promise.reject(console.error('auth required'));

  Gallery.findById(req.params.id)
  .then(gallery => {
    if(gallery.userId.toString() !== req.user._id.toString()) {
      return createError(401, 'Invalid user');
    }
    res.json(gallery);
  })
  .catch(err => res.status(err.status).send(err.message));

};
