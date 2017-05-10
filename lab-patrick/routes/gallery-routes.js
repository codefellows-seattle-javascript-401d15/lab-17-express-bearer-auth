'use strict';

const createError = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware');
const galleryCtrl = require('../controller/gallery-controller');

module.exports = function(router){
  router.post('/gallery', bearerAuth, (req, res) =>{

    galleryCtrl.createItem(req.body, req.user)
    .then(gallery => res.json(gallery))
    .catch(err => console.error(err));
  });

  router.get('/gallery/:id', bearerAuth, (req, res) =>{
    galleryCtrl.fetchItem(req.params.id)
     .then(gallery => {
       if(gallery.userId.toString() !== req.user._id.toString()) {
         return createError(401, 'Invalid user');
       }
       res.json(gallery);
     })
   .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
