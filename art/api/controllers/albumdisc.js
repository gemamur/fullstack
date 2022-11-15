'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Albumdisc = require('../models/albumdisc');
var Song = require('../models/song');

function getAlbumdisc(req,res){
  var albumdiscId = req.params.id;

  Albumdisc.findById(albumdiscId).populate({path:'artist'}).exec((err, albumdisc)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albumdisc){
        res.status(404).send({message:'El album no existe'});
      }else{
        res.status(200).send({albumdisc});
      }
    }
  });
}

function getAlbumdiscs(req, res){
  var artistId = req.params.artist;

  if(!artistId){
    //sacar todos los albums de la base de datos
    var find = Albumdisc.find({}).sort('title');

  }else{
    //sacar los albumes de un artista concreto de la base de datos
    var find = Albumdisc.find({artist: artistId}).sort('year');
  }
  find.populate({path: 'artist'}).exec((err, albumdiscs)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albumdiscs){
        res.status(404).send({message:'No hay albums'});

      }else{
        res.status(200).send({albumdiscs});

      }
    }
  })
}

function saveAlbumdisc(req,res){
  var albumdisc = new Albumdisc();
  var params = req.body;

  albumdisc.name = params.name;
  albumdisc.description = params.description;
  albumdisc.year = params.year;
  albumdisc.image = 'noimage.gif';
  albumdisc.artist = params.artist;

albumdisc.save((err, albumdiscStored)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albumdiscStored){
        res.status(404).send({message:'No se ha guardado el album'});

      }else{
        res.status(200).send({albumdisc:albumdiscStored});

      }
    }
  })
}

function updateAlbumdisc(req,res){
  var albumdiscId = req.params.id;
  var update = req.body;

  Albumdisc.findByIdAndUpdate(albumdiscId, update,(err, albumdiscUpdated)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albumdiscUpdated){
        res.status(404).send({message:'No se ha actualizado el album'});
      }else{
        res.status(200).send({albumdisc:albumdiscUpdated});
      }
    }
  });
}

function deleteAlbumdisc(req,res){
  var albumdiscId = req.params.id;
  Albumdisc.findByIdAndRemove(albumdiscId,(err, albumdiscRemoved)=>{
    if(err){
      res.status(500).send({message:'Error al eliminar el album'});
    }else{
      if(!albumdiscRemoved){
        res.status(404).send({message:'El album no ha sido eliminado'});
      }else{
        Song.find({albumdisc: albumdiscRemoved._id}).remove((err, songRemoved)=>{
          if(err){
            res.status(500).send({message:'Error al eliminar la canción'});
          }else{
            if(!songRemoved){
              res.status(404).send({message:'La canción no ha sido eliminada'});
            }else{
              res.status(200).send({albumdisc: albumdiscRemoved});
            }
          }
        });
      }
    }
  });
}

function uploadImage(req,res){
  var albumdiscId = req.params.id;
  var file_name = 'no subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
      Albumdisc.findByIdAndUpdate(albumdiscId, {image:file_name}, (err, albumdiscUpdated)=>{
        if(!albumdiscUpdated){
          res.status(404).send({message: 'No se ha podido actualizar la imagen'});
        }else{
          res.status(200).send({albumdisc:albumdiscUpdated});
        }
      });
    }else{
      res.status(200).send({message: 'Extensión del archivo no es correcta'});

    }
  }else{
    res.status(200).send({message: 'No has subido ninguna imagen'});
  }
}

function getImageFile(req, res){
  var imageFile = req.params.imageFile;
  var path_file = './uploads/albumdiscs/'+imageFile;
  fs.exists(path_file, (exists)=>{
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe la imagen'});

    }
  })
}
module.exports = {
  getAlbumdisc,
  saveAlbumdisc,
  getAlbumdiscs,
  updateAlbumdisc,
  deleteAlbumdisc,
  uploadImage,
  getImageFile
}
