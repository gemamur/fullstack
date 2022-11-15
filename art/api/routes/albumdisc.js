'use strict'

var express = require('express');
var AlbumdiscController = require('../controllers/albumdisc');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/albumdiscs'});

api.get('/albumdisc/:id', AlbumdiscController.getAlbumdisc);
api.get('/albumdiscs/:artist?', AlbumdiscController.getAlbumdiscs);

api.post('/albumdisc', md_auth.ensureAuth, AlbumdiscController.saveAlbumdisc);
api.put('/albumdisc/:id', md_auth.ensureAuth, AlbumdiscController.updateAlbumdisc);
api.delete('/albumdisc/:id', md_auth.ensureAuth, AlbumdiscController.deleteAlbumdisc);

api.post('/upload-image-albumdisc/:id', [md_auth.ensureAuth, md_upload], AlbumdiscController.uploadImage);
api.get('/get-image-albumdisc/:imageFile', AlbumdiscController.getImageFile);


module.exports=api;
