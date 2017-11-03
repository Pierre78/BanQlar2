var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  login: String,
  pass: String
});

var User = mongoose.model('User', User);

module.exports = User;
