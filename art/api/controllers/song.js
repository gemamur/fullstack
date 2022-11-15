'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Albumdisc = require('../models/albumdisc');
var Song = require('../models/song');

function getSong(req,res){
  var songId = req.params.id;

  Song.findById(songId).populate({path: 'albumdisc'}).exec((err, song)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!song){
        res.status(404).send({message: 'La canción no existe'});
      }else{
        res.status(200).send({song});
      }
    }
  });
}

function getSongs(req,res){

  var albumdiscId = req.params.albumdisc;
  if(!albumdiscId){
    var find = Song.find({}).sort('number');
  }else{
    var find = Song.find({albumdisc: albumdiscId}).sort('number');
  }
  find.populate({
    path: 'albumdisc',
    populate:{
      path: 'artist',
      model: 'Artist'
    }
  }).exec((err, songs)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!songs){
        res.status(404).send({message: 'La canción no existe'});
      }else{
        res.status(200).send({songs});
      }
    }
  });
}

function getHomeSongs(req,res){

    var find = Song.find({}).sort('-_id').limit(5);
  find.populate({
    path: 'albumdisc',
    populate:{
      path: 'artist',
      model: 'Artist'
    }
  }).exec((err, songs)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!songs){
        res.status(404).send({message: 'La canción no existe'});
      }else{
        res.status(200).send({songs});
      }
    }
  });
}

function getHomeFavSongs(req,res){
  var find = Song.find({}).sort('-favorites').limit(5);
  find.populate({
    path: 'albumdisc',
    populate:{
      path: 'artist',
      model: 'Artist'
    }
  }).exec((err, songs)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!songs){
        res.status(404).send({message: 'La canción no existe'});
      }else{
        res.status(200).send({songs});
      }
    }
  });
}

function saveSong(req,res){
  var song = new Song();
  var params = req.body;

  song.number = params.number;
  song.name = params.name;
  song.duration = params.duration;
  song.file = 'null';
  song.albumdisc = params.albumdisc;
  song.favorites = 0;
  song.userVotes = [];

  song.save((err, songStored)=>{
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!songStored){
        res.status(404).send({message: 'No se ha guardado la canción'});
      }else{
        res.status(200).send({song:songStored});
      }
    }
  });
}

function updateSong(req,res){
  var songId = req.params.id;
  var update = req.body;

  Song.findByIdAndUpdate(songId, update, (err, songUpdated)=>{
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!songUpdated){
        res.status(404).send({message: 'No se ha actualizado la canción'});
      }else{
        res.status(200).send({song:songUpdated});
      }
    }
  });
}

function deleteSong(req,res){
  var songId = req.params.id;
  Song.findByIdAndRemove(songId, (err, songRemoved)=>{
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!songRemoved){
        res.status(404).send({message: 'No se ha borrado la canción'});
      }else{
        res.status(200).send({song:songRemoved});
      }
    }
  });
}

function uploadFile(req,res){
  var songId = req.params.id;
  var file_name = 'no subido...';

  if(req.files){
    var file_path = req.files.file.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'mp3' || file_ext == 'ogg'){
      Song.findByIdAndUpdate(songId, {file:file_name}, (err, songUpdated)=>{
        if(!songUpdated){
          res.status(404).send({message: 'No se ha podido actualizar la canción'});
        }else{
          res.status(200).send({song:songUpdated});
        }
      });
    }else{
      res.status(200).send({message: 'Extensión del archivo no es correcta'});

    }
  }else{
    res.status(200).send({message: 'No has subido ningun fichero de audio'});
  }
}

function getSongFile(req, res){
  var songFile = req.params.songFile;
  var path_file = './uploads/songs/'+songFile;
  fs.exists(path_file, (exists)=>{
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe el fichero de audio'});

    }
  })
}

function songFavorite(req,res){
  var songId = req.params.songid;

  Song.findById(songId, (err, song)=>{
    if(err){
      res.status(500).send({err});
    }else{
      if(!song){
        res.status(404).send({message: 'No existe la canción'});
      }else{
        Albumdisc.populate(song, {path: 'albumdisc',
                                  populate:{path: 'artist', model: 'Artist'}},(err, song)=>{
          if(err){
            res.status(500).send({message: 'Error en la petición'});
          }else{
            var userId = req.params.userid;
            var userTrue = 0;
            for (var fav=0; fav<song.userVotes.length; fav++){

              if(userId == song.userVotes[fav]){
                userTrue = 1;
              }else{
                userTrue = 0;
              }
            }//for

            var favorite = song.favorites +1;

            if(userTrue == 0){
              Song.findOneAndUpdate({"_id": songId}, {$set:{"favorites": favorite}, $push:{userVotes: userId}}).exec((err, songUpdated)=>{
                if(err){
                  res.status(500).send({err});
                }else{
                  if(!songUpdated){
                    res.status(404).send({message:'No se ha actualizado la canción'});
                  }else{
                    res.status(200).send({song: songUpdated});
                  }
                }
              });//findOneAndUpdate
            }else{
              var favorite = song.favorites -1;
              Song.findOneAndUpdate({"_id": songId}, {$set:{"favorites": favorite}, $pull:{userVotes: userId}}).exec((err,songUpdated)=>{
                if(err){
                  res.status(500).send({message: 'Error en la petición3'});
                }else{
                  if(!songUpdated){
                    res.status(404).send({message:'No se ha actualizado la canción'});
                  }else{
                    res.status(200).send({song: songUpdated});
                  }
                }
              });//exec
            }
          }//else
        });//populate

      }
    }
    });

}

module.exports = {
  getSong,
  saveSong,
  getSongs,
  getHomeSongs,
  getHomeFavSongs,
  updateSong,
  deleteSong,
  uploadFile,
  getSongFile,
  songFavorite
}
