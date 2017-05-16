'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const User = require('../models/user.js');
const Gallery = require('../models/gallery.js');

require('../server');

const url = `http://localhost:${process.env.PORT}`;

const testUser = {
  username: 'testy',
  password: 'abc123',
  email: 'fake@fake.com',
};

const testGallery = {
  name: 'test name',
  desc: 'test description',
};

const invalidGallery = {
  blah: 'blah',
};

mongoose.Promise = Promise;

describe('Gallery routes', function() {
  afterEach(done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });
  
  describe('POST tests', function() {
    before(done => {
      new User(testUser)
      .generatePasswordHash(testUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        console.log('temporary user', this.tempUser);
        return user.generateToken();
      })
      .then(token => {
        console.log('test token', token);
        this.tempToken = token;
        done();
      })
      .catch(() => done());
    });
    
    it('should return a gallery', done => {
      request.post(`${url}/api/gallery`)
      .send(testGallery)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if(err) return done(err);
        let date = new Date(res.body.created).toString();
        expect(res.body.name).to.equal(testGallery.name);
        expect(res.body.desc).to.equal(testGallery.desc);
        expect(res.body.userId).to.equal(this.tempUser._id.toString());
        expect(date).to.not.equal('Invalid Date');
        expect(res.status).to.equal(200);
        done();
      });
    });
    
    it('should thrown an error if not given a token', done => {
      request.post(`${url}/api/gallery`)
      .send(testGallery)
      .set({
        Authorization: `Bearer `,
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
    
    it.only('should return a "bad request" error if not given a correct body', done => {
      request.post(`${url}/api/gallery`)
      .send({name:''})
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400); //put the expect in a catch
        done();
      });
    });
  });
  
  describe('GET routes', function() {
    before(done => {
      new User(testUser)
      .generatePasswordHash(testUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then(token => {
        this.tempToken = token;
        done();
      })
      .catch(() => done());
    });
    
    before(done => {
      testGallery.userId = this.tempUser._id.toString();
      new Gallery(testGallery).save()
      .then(gallery => {
        this.tempGallery = gallery;
        done();
      })
      .catch(() => done());
    });
    
    after(() => {
      delete testGallery.userId;
    });
    
    it('should return a gallery', done => {
      request.get(`${url}/api/gallery/${this.tempGallery._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        let date = new Date(res.body.created).toString();
        expect(res.body.name).to.equal(testGallery.name);
        expect(res.body.desc).to.equal(testGallery.desc);
        expect(res.body.userId).to.equal(this.tempUser._id.toString());
        expect(date).to.not.equal('Invalid Date');
        expect(res.status).to.equal(200);
        done();
      });
    });
    
    it('should throw an error if given the wrong credentials', done => {
      request.get(`${url}/api/gallery/${this.tempGallery._id}`)
      .set({
        Authorization: `Bearer `,
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
    
    it('should throw an error if given an invalid id', done => {
      request.get(`${url}/api/gallery/`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});