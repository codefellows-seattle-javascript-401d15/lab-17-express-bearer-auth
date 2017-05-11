'use strict'

const createError = require('http-errors')
const Gallery = require('../models/gallery')
const debug = require('debug')('cfgram:bearer-auth-middleware')
const bearerAuth = require('../lib/bearer-auth-middleware')

module.exports = function(router) {
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery')

    req.body.userId = req.user._id
    new Gallery(req.body).save()
    .then(gallery => res.json(gallery))
    .catch(err => res.status(err.status).send(err.message))
  })

  router.get('/gallery', bearerAuth, (req, res) => {
    debug('#GET /api/gallery/:id')

    Gallery.findById(req.params.id)
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid user')
      }
      res.json(gallery)
    })
    .catch(err => res.status(err.status).send(err.message))
  })

  router.put('/gallery', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery')

    Gallery.updateItem('galley', req.params.id, req.body)
    .then(gallery => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(gallery));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    })
    return
  })


  router.delete('/gallery', bearerAuth, (req, res) => {
    debug('#DELETE /api/gallery')


  })
  return router
}
