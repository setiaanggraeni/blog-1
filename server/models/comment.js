var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: String,
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  username: String
}, {
  timestamps: true
});

var article = mongoose.model('Comments', CommentSchema)

module.exports = article