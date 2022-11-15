'use strict'
var Album = require('../models/album');
var Image = require('../models/image');

function getAlbum(req, res){
  var albumId = req.params.id;
  Album.findById(albumId, (err, album) =>{
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }else{
      if(!album){
        res.status(404).send({message: "El album no existe"});
      }else{
        res.status(200).send({album});
      }
    }
  });
}

function getAlbums(req, res){
  if(req.params.page){
    var page= req.params.page;
  }else{
    var page=1;
  }
  var itemsPerPage = 8;
  Album.find().sort('-_id').paginate(page, itemsPerPage, (err, albums, total)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albums){
        res.status(404).send({message:'No hay álbumes'});
      }else{
        return res.status(200).send({
          total_items:total,
          albums: albums
        });
      }
    }
  });
}

function saveAlbum(req,res){
  var album = new Album();
  var params = req.body;
  album.title = params.title;
  album.description = params.description;
  album.cat = params.cat;
  album.owner = params.owner;

  album.save(( err, albumStored)=>{
    if(err){
      res.status(500).send({message: 'Error al guardar el album'});
    }else{
      if(!albumStored){
        res.status(404).send({message:"No se ha guardado el album"});
      }else{
        res.status(200).send({album: albumStored});
      }
    }
  });
}

function updateAlbum(req, res){
  var albumId = req.params.id;
  var update = req.body;

  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albumUpdated){
        res.status(404).send({message: 'No se ha podido actualizar el album'});
      }else{
        res.status(200).send({album: albumUpdated});
      }
    }
  });
}

function deleteAlbum2(req, res){
  var albumId = req.params.id;

  Album.findByIdAndRemove(albumId,(err, albumRemoved)=>{
    if(err){
      res.status(500).send({message:'Error al borrar la petición'});
    }else{
      if(!albumRemoved){
        res.status(404).send({message: 'No se ha podido eliminar el album'});
      }else{
        res.status(200).send({album: albumRemoved});
      }
    }
  });
}

function deleteAlbum(req,res){
  var albumId = req.params.id;

  Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
    if(err){
      res.status(500).send({message: 'Error al eliminar el album'});
    }else{
      if(!albumRemoved){
        res.status(404).send({message: 'El album no existe'});
      }else{
        Image.find({album: albumRemoved._id}).remove((err, imageRemoved)=>{
          if(err){
            res.status(500).send({message: 'Error al eliminar la imagen'});
          }else{
            if(!imageRemoved){
              res.status(404).send({message: 'La imagen no ha sido eliminada'});
            }else{
              res.status(200).send({album: albumRemoved});
            }
          }
        });//image.find
      }
    }
  });//findByIdAndRemove
}

function buscarAlbums(req,res){
  var texto = req.params.texto;
  Album.find({$or:[
    {title: {$regex : new RegExp (texto, "i")}},
    {cat: {$regex : new RegExp (texto, "i")}}
  ]}).sort('title').exec((err, albums)=>{
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!albums){
        res.status(404).send({message: 'No hay albums'});
      }else{
        res.status(200).send({albums});
      }
    }
  });
}

module.exports = {
  getAlbum,
  getAlbums,
  saveAlbum,
  updateAlbum,
  deleteAlbum,
  buscarAlbums
};
