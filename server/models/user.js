var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

var user = mongoose.model('Users', UserSchema)

module.exports = user