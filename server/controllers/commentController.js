const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ModelComment = require('../models/comment')
const Article = require('../models/article')

var salt = bcrypt.genSaltSync(8);

class CommentController {
  static addComment(req, res){
    let token = req.headers.token
    let articleId = req.params.articleId
    let {comment} = req.body
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
      if(decoded){
        ModelComment.create({
          comment, userId: decoded.id, username: decoded.name
        })
        .then(newComment => {
          // console.log('masuk add comment -------',newComment)
          Article.update({_id: articleId}, {
            $push: {
              commentId: newComment._id
            }
          })
          .then(addNewCommentIdToArticle => {
            // console.log('masuk push id comment -------',addNewCommentIdToArticle)
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
      } else {
        res.status(401).json({
          err,
          message: 'Invalid token!'
        })
      }
    })
  }

  static deleteComment(req, res){
    let token = req.headers.token
    let id = req.params.id
    jwt.verify(token, process.env.secretKey, function(err, decoded){
      if(decoded.isAdmin === true){
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
        res.status(401).json({
          message: 'You have no access to delete this comment!'
        })
      }
    })
  }

}

module.exports = CommentController