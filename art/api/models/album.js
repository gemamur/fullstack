'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
  title: String,
  description: String,
  cat: String,
  owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Album', AlbumSchema);
