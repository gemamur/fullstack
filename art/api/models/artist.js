'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
  name: String,
  description: String,
  image: String,
  owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Artist', ArtistSchema);
