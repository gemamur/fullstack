'use strict'

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
//var multer=require('multer');
//var upload=multer({dest: './uploads'})

api.get('/prueba-image', ImageController.pruebas);
api.get('/image/:id', ImageController.getImage);
api.post('/image', ImageController.saveImage);
api.get('/images/:album?', ImageController.getImages);
api.get('/home-images', ImageController.getHomeImages);
api.get('/home-favimages', ImageController.getHomeFavImages);
api.put('/image/:id', ImageController.updateImage);
api.delete('/image/:id', ImageController.deleteImage);

api.get('/addfav/:imageid/:userid', ImageController.setFavorite);

api.post('/upload-image/:id', multipartMiddleware, ImageController.uploadImage);
api.get('/get-image/:imageFile', multipartMiddleware, ImageController.getImageFile);


module.exports = api;
