'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  nick: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  bio: String,
  website: String,
  role: String,
  image: String
});

module.exports = mongoose.model('User', UserSchema);
