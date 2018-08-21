var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    validate:{
      validator: function(value){
         let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         return re.test(value);
      }
   },
   unique: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

var user = mongoose.model('Users', UserSchema)

module.exports = user