'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
  number: Number,
  name: String,
  duration: String,
  file: String,
  favorites: Number,
  userVotes: [String],
  albumdisc: {type: Schema.ObjectId, ref: 'Albumdisc'},
  owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Song', SongSchema);
