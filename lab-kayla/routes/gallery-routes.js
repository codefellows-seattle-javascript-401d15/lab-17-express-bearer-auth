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

  

  return router
}
