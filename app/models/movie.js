
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MovieSchema = new Schema({
  name: String,
  rating: String,
  releaseUear: Number,
  hasCreditCookie: Boolean
});

module.exports = mongoose.model('Movie', MovieSchema);
