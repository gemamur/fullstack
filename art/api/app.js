'use strict'

var express = require('express');
var bodyParser = require('body-parser');
//var multer = require('multer');

var app = express();

var album_routes = require('./routes/album');
var image_routes = require('./routes/image');
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var albumdisc_routes = require('./routes/albumdisc');
var song_routes = require('./routes/song');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.use('/api', album_routes);
app.use('/api', image_routes);
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', albumdisc_routes);
app.use('/api', song_routes)

module.exports = app;
