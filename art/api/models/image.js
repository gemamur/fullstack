'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = Schema({
  title: String,
  description: String,
  picture: String,
  favorites: Number,
  userVotes: [String],
  album: {type: Schema.ObjectId, ref: 'Album'},
  owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Image', ImageSchema);
