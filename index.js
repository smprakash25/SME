//const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
//const rentals = require('./routes/rentals');
const users = require('./routes/users');
const login = require('./routes/login');
const photos=require('./routes/photos');
const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var ejs = require("ejs");
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
const app = express();
dotenv.config();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public',express.static(__dirname+'/public'));
app.use(cookieParser());
if (!process.env.SECRET) {
  console.error('FATAL ERROR: SECRET is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/project')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
//app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/photos',photos);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`))