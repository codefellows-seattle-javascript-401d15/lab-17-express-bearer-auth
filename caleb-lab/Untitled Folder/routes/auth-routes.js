'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../models/user.js');
const userCtrl = require('../controllers/user-controller.js');

module.exports = function(router){
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    let tempPassword = req.body.password;
    req.body.password = null; //this is an extra option to destroy the req.body.password data
    delete req.body.password;
    userCtrl.createUser(req.body, tempPassword)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    //working on controller and GET
    return userCtrl.fetchUser(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });
  return router;
};
