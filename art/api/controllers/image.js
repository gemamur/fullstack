'use strict'

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');
var User = require('../models/user');

function pruebas(req, res){
  res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

function getImage(req, res){
  var imageId = req.params.id;
  Image.findById(imageId, (err, image)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!image){
        res.status(404).send({message:'No existe la imagen'});
      }else{
        Album.populate(image, {path: 'album'}, (err, image)=>{
          if(err){
            res.status(500).send({message: 'Error en la petición'});
          }else{
            res.status(200).send({image});
          }
        });
      }
    }
  });
}

function getImages(req, res){
  var albumId = req.params.album;
  if(!albumId){
    var find = Image.find({}).sort('-_id');
  }else{
    var find = Image.find({album: albumId}).sort('_id');
}

find.exec((err, images)=>{
  if(err){
    res.status(500).send({message:'Error en la petición'});
  }else{
    if(!images){
      res.status(404).send({message:'No hay imágenes en este album'});
    }else{
      Album.populate(images, {path: 'album'}, (err, images)=>{
        if(err){
          res.status(500).send({message: 'Error en la petición'});
        }else{
          res.status(200).send({images});
        }
      });
    }
  }
});
}

function getHomeImages(req, res){
  var find = Image.find({}).sort('-_id').limit(5);
  find.populate({
    path: 'album',
    populate:{
      path: 'owner',
      model: 'User'
    }
  }).exec((err, images)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!images){
        res.status(404).send({message:'No hay imágenes'});
      }else{
        res.status(200).send({images});
      }
    }
  });
}

function getHomeFavImages(req,res){
  var find = Image.find({}).sort('-favorites').limit(5);
  find.populate({
    path: 'album',
    populate:{
      path: 'owner',
      model: 'User'
    }
  }).exec((err, images)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!images){
        res.status(404).send({message:'No hay imágenes'});
      }else{
        res.status(200).send({images});
      }
    }
  });
}

function saveImage(req, res){
  var image = new Image();

  var params = req.body;
  image.title = params.title;
  image.description=params.description;
  image.album=params.album;
  image.owner=params.owner;
  image.picture = null;
  image.favorites = 0;
  image.userVotes=[];

  image.save((err, imageStored) => {
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!imageStored){
        res.status(400).send({message:'No se ha guardado la imagen'});
      }else{
        res.status(200).send({image: imageStored});
      }
    }
  });
}

function updateImage(req, res){
  var imageId = req.params.id;
  var update = req.body;
  Image.findByIdAndUpdate(imageId, update, (err, imageUpdated)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!imageUpdated){
        res.status(404).send({message:'No se ha actualizado la imagen'});
      }else{
        res.status(200).send({image: imageUpdated});
      }
    }
  });
}

function deleteImage(req,res){
  var imageId = req.params.id;
  Image.findByIdAndRemove(imageId, (err, imageRemoved)=>{
    if(err){
      res.status(500).send({message:'Error al borrar la imagen'});
    }else{
      if(!imageRemoved){
        res.status(404).send({message:'No se ha eliminado la imagen'});
      }else{
        res.status(200).send({image: imageRemoved});
      }
    }
  });
}

function uploadImage(req, res){
  var imageId = req.params.id;
  var file_name = 'No subido...';

  if(req.files){

    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[1];

    Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated)=>{
      if(err){
        res.status(500).send({message:'Error en la petición'});
      }else{
        if(!imageUpdated){
          res.status(404).send({message:'No se ha actualizado la imagen'});
        }else{
          res.status(200).send({image: imageUpdated});
        }
      }
    });
  }else{
    res.status(200).send({message:'No has subido ninguna imagen'});
  }
}

var fs=require('fs');
function getImageFile(req,res){
  var imageFile = req.params.imageFile;
  fs.exists('./uploads/'+imageFile, function(exists){
    if(exists){
      res.sendFile(path.resolve('./uploads/'+imageFile));
    }else{
      res.sendFile(path.resolve('./uploads/noimage.gif'));

      //res.status(200).send({message: 'No existe la imagen'});
    }
  });
}

function setFavorite(req,res){
  var imageId = req.params.imageid;

  Image.findById(imageId, (err, image)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!image){
        res.status(404).send({message:'No existe la imagen'});
      }else{
        Album.populate(image, {path: 'album'}, (err, image)=>{
          if(err){
            res.status(500).send({message: 'Error en la petición'});
          }else{
            //res.status(200).send({image});
            //var fav = image.favorites +1;

            var userId = req.params.userid;
            var userTrue = 0;
            for(var fav=0; fav<image.userVotes.length; fav++){

              if(userId == image.userVotes[fav]){
                userTrue++;
              }else{
                userTrue = userTrue+0;
              }
            }
            var favorite = image.favorites +1;
            if(userTrue == 0){
              Image.findOneAndUpdate({"_id": imageId}, {$set:{"favorites": favorite}, $push:{userVotes: userId}}).exec((err,imageUpdated)=>{
                if(err){
                  res.status(500).send({message:'Error en la petición'});
                }else{
                  if(!imageUpdated){
                    res.status(404).send({message:'No se ha actualizado la imagen'});
                  }else{
                    res.status(200).send({image: imageUpdated});
                  }
                }
              });
            }else{
              var favorite = image.favorites -1;
              Image.findOneAndUpdate({"_id": imageId}, {$set:{"favorites": favorite}, $pull:{userVotes: userId}}).exec((err,imageUpdated)=>{
                if(err){
                  res.status(500).send({message:'Error en la petición'});
                }else{
                  if(!imageUpdated){
                    res.status(404).send({message:'No se ha actualizado la imagen'});
                  }else{
                    res.status(200).send({image: imageUpdated});
                  }
                }
              });
            }
          }
        });
      }
    }
  });
}


module.exports = {
  pruebas,
  getImage,
  saveImage,
  getImages,
  getHomeImages,
  getHomeFavImages,
  updateImage,
  deleteImage,
  uploadImage,
  getImageFile,
  setFavorite
};
