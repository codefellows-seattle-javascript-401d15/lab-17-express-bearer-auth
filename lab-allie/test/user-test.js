'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../models/user.js');

mongoose.Promise = Promise;

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const testUser = {
  username: 'testy',
  password: 'abc123',
  email: 'fake@fake.com',
};

describe('Testing auth routes', function() {
  describe('Testing user POST route', function() {
    after(done => {
      User.remove({})
      .then(() => done());
    });
    
    it('should return a token', done => {
      request.post(`${url}/api/signup`)
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.be.a('string');
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  
  describe('Testing user GET route', function() {
    describe('Checking for token', function() {
      before(done => {
        let user = new User(testUser);
        user.generatePasswordHash(testUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
      });
      
      it('should return a token', done => {
        request.get(`${url}/api/signin`)
        .auth('testy', 'abc123')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });
    });
    
    describe('checking for status', function() {
      before(done => {
        let user = new User(testUser);
        user.generatePasswordHash(testUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
      });
      
      it('should return an error on a bad request', done => {
        request.get(`${url}`)
        .auth('', '')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });
    });
  });
});