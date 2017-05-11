'use strict'

const createError = require('http-errors')
const debug = require('debug')('cfgram:gallery-routes.js')
const galleryCtrl = require('../controllers/gallery-controller.js')
const bearerAuth = require('../lib/bearer-auth-middleware.js')

module.exports = function(router){
  router.post('/gallery', bearerAuth, (req, res) => {
    debug('#POST /api/gallery')

    req.body.userId = req.user._id

    return galleryCtrl.createGallery(req.body)
    .then(gallery => res.json(gallery))
    .catch(err => res.status(err.status).send(err.message))
  })

  router.get('/gallery/:id', bearerAuth, (req, res) => {
    debug('GET /api/gallery/:id')
    return galleryCtrl.fetchGallery(req.params.id)
    .then(gallery => {
      if(gallery.userId.toString() !== req.user._id.toString()){
        return createError(401, 'Invalid user')//this is making a request to a gallery that you don't own...this is validating that the user making the query can see only their galleries, not other people's galleries
      }
      res.json(gallery)
    })
    .catch(err => res.status(err.status).send(err.message))
  })

  router.put('/gallery/:id', bearerAuth, (req, res) => {
    debug('#PUT /api/gallery/:id')
    return galleryCtrl.updateGallery(req.params.id)
    .then(gallery => {
      console.log(gallery)
      res.json(gallery)
    })
    .catch(err => res.status(err.status).send(err.message))
  })

  router.delete('gallery/:id', bearerAuth, (req, res) => {
    debug('DELETE /api/gallery/:id')
    return galleryCtrl.deleteGallery(req.params.id)
    .then(gallery => {
      console.log(gallery)
    })
    .catch(err => res.status(err.status).send(err.message))
  })
  return router
}
