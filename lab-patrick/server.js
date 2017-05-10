'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-middleware');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const authRoutes = require('./routes/user-routes')(router);
const galleryRoutes = require('./routes/gallery-routes')(router);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cfgram-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(errorHandler);
app.use(bodyParser);

app.use('/api', authRoutes);
app.use('/api', galleryRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
