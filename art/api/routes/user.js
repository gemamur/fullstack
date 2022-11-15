'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
api.get('/user/:id', UserController.getUser);
api.get('/users/:page?', UserController.getUsers);
api.get('/albums-user/:id', UserController.getAlbumsUser);
api.get('/gallery-user/:id', UserController.getGalleryUser);
api.get('/music-user/:id', UserController.getMusicUser);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.get('/buscar-usuarios/:texto', UserController.buscarUsuarios);

module.exports = api;
