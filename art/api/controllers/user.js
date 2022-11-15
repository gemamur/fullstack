'use strict'

var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var Album = require('../models/album');
var Image = require('../models/image');
var Artist = require('../models/artist');
var jwt = require('../services/jwt');

function pruebas(req,res){
  res.status(200).send({
    message:'Probando una acción del controlador de usuarios del apiRest con Node y Mongo'
  });
}

function getUser(req,res){
  var userId = req.params.id;

  User.findById(userId,(err, user)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!user){
        res.status(404).send({message:'El usuario no existe'});
      }else{
        res.status(200).send({user});
      }
    }
  });
}

function getUsers(req,res){
  if(req.params.page){
    var page= req.params.page;
  }else{
    var page=1;
  }
  var itemsPerPage = 8;

  User.find().sort('name').paginate(page, itemsPerPage, (err, users, total)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!users){
        res.status(404).send({message:'No hay usuarios'});
      }else{
        return res.status(200).send({
          total_items:total,
          users: users
        });
      }
    }
  });
}

function getAlbumsUser(req, res){
  var id = req.params.id;
  var find = Album.find({owner: id}).sort('-_id');
  find.populate({path: 'owner'}).exec((err, albums)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!albums){
        res.status(404).send({message:'No hay albums'});
      }else{
        res.status(200).send({albums});
      }
    }
  });
}

function getGalleryUser(req,res){
  var id = req.params.id;
  var find = Image.find({owner: id}).sort('-_id');
  find.populate({
     path:'album'
  }).exec((err, images) =>{
      if(err){
        res.status(500).send({message: 'Error en la petición'});
      }else{
        if(!images){
          res.status(404).send({message: 'No hay imágenes'});
        }else{
          res.status(200).send({images});
        }
      }

  });
}

function getMusicUser(req,res){
  var id = req.params.id;
  Artist.find({owner: id}).sort('-_id').exec((err,artists)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!artists){
        res.status(404).send({message: 'No hay artistas'});
      }else{
        res.status(200).send({artists});
      }
    }
  });
}

function saveUser(req,res){
  var user = new User();

  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.nick = params.nick;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'noimage.gif';
  user.bio = params.bio;
  user.website = params.website;

  if(params.password){
    //encriptar contraseña y guardar datos
    bcrypt.hash(params.password, null, null, function(err, hash){
      user.password = hash;
        if(user.name != null && user.surname != null && user.email != null && user.nick!= null){
          user.save((err,userStored)=> {
            if(err){
              if(err.name === 'MongoError' || err.code === 11000){
                res.status(500).send({message:'Error al guardar el usuario; El nombre de usuario o email ya existe'});
              }else{
                res.status(500).send({message:'Error al guardar el usuario' + ' Error: '+ err.code});
              }

            }else{
              if(!userStored){
                res.status(404).send({message:'No se ha registrado el usuario'});
              }else{
                res.status(200).send({user: userStored});
              }
            }
          })
        }else{
          res.status(200).send({message: 'Rellena todos los campos'});
        }
    });
  }else{
    res.status(200).send({message: 'Introduce la contraseña'});
  }
}

function loginUser(req, res){
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({email: email.toLowerCase()}, (err, user)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!user){
        res.status(404).send({message: 'El usuario no existe'});
      }else{
        //comprobar contraseña
        bcrypt.compare(password, user.password, (err, check)=>{
          if(check){
            //devolver datos usuario logueado
            if(params.gethash){
              //devolver token jwt
              res.status(200).send({
                token: jwt.createToken(user)
              });
            }else{
              res.status(200).send({user});
            }
          }else{
            res.status(404).send({message: 'Login incorrecto'});
          }
        })
      }
    }
  })
}

function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;

  if(userId != req.user.sub){
    return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
  }

  User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
    if(err){
      res.status(500).send({message: 'Error al actualizar el usuario'});
    }else{
      if(!userUpdated){
        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
      }else{
        res.status(200).send({user:userUpdated});
      }
    }
  });
}

function uploadImage(req,res){
  var userId = req.params.id;
  var file_name = 'no subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
      User.findByIdAndUpdate(userId, {image:file_name}, (err, userUpdated)=>{
        if(!userUpdated){
          res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        }else{
          res.status(200).send({image: file_name, user:userUpdated});
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
  var path_file = './uploads/users/'+imageFile;
  fs.exists(path_file, (exists)=>{
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe la imagen'});

    }
  })
}

function buscarUsuarios(req,res){
  var texto = req.params.texto;
  User.find({$or:[
    {name: {$regex : new RegExp (texto, "i")}},
    {nick: {$regex : new RegExp (texto, "i")}}
  ]}).sort('name').exec((err, users)=>{
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!users){
        res.status(404).send({message: 'No hay users'});
      }else{
        res.status(200).send({users});
      }
    }
  });
}

module.exports = {
  pruebas,
  getUser,
  getUsers,
  getAlbumsUser,
  getGalleryUser,
  getMusicUser,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile,
  buscarUsuarios
};
