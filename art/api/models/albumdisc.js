'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var AlbumdiscSchema = Schema({
  name: String,
  description: String,
  year: Number,
  image: String,
  artist: {type: Schema.ObjectId, ref:'Artist'},
  cat: String,
  owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Albumdisc', AlbumdiscSchema);
