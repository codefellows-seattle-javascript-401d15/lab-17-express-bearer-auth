'use strict'

const expect = require('chia').expect
const request = require('superagent')
const mongoose = require('mongoose')
const Promise = require('bluebird')

const User = require('../models/user')
const Gallery = require('../models/galelry')

const url = `http://localhost:${process.env.PORT}`

const exampleUser = {
  username: 'exampleuser',
  password: 'password',
  email: 'example@test.com'
}

const exampleGallery = {
  name: 'test gallery',
  desc: 'test gallery description'
}

mongoose.Promise = Promise
