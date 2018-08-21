var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  shortDescription: String,
  imgUrl: String,
  content: String,
  commentId: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
}, {
  timestamps: true
});

var article = mongoose.model('Articles', ArticleSchema)

module.exports = article