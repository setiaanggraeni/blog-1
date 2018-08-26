const ModelComment = require('../models/comment')
const Article = require('../models/article')

class CommentController {
  static addComment(req, res){
    let articleId = req.params.articleId
    let {comment} = req.body
        ModelComment.create({
          comment, userId: req.user.id, username: req.user.name
        })
        .then(newComment => {
          Article.update({_id: articleId}, {
            $push: {
              commentId: newComment._id
            }
          })
          .then(addNewCommentIdToArticle => {
            res.status(201).json({newComment, addNewCommentIdToArticle})
          })
          .catch(err => {
            res.status(400).json({
              err,
              message: 'Failed to push commentId to Article'
            })
          })

        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to post comment!'
          })
        })
  }

  static deleteComment(req, res){
    let id = req.params.id
    ModelComment.findOne({_id: id})
    .then(comment => {
      if(String(comment.userId) == String(req.user._id)){
        ModelComment.deleteOne({_id: id})
        .then(deletedComment => {
          res.status(201).json({
            message: 'Delete comment successfully!'
          })
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to delete comment!'
          })
        })
      } else {
        res.status(400).json({
          message: 'You have no access to delete this comment!'
        })
      }
    })
    
  }

}

module.exports = CommentController