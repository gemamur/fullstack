'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/songs'});

api.get('/song/:id', SongController.getSong);
api.get('/songs/:albumdisc?', SongController.getSongs);
api.get('/home-songs', SongController.getHomeSongs);
api.get('/home-favsongs', SongController.getHomeFavSongs);

api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);

api.get('/songfav/:songid/:userid', SongController.songFavorite);

api.post('/upload-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadFile);
api.get('/get-song/:songFile', SongController.getSongFile);

module.exports=api;
