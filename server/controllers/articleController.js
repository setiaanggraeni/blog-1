const jwt = require('jsonwebtoken')
const Article = require('../models/article')
const User = require('../models/user')

class ArticleController{
  static addArticle(req, res){
    let token = req.headers.token
    let {title, shortDescription, imgUrl, content} = req.body
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
      // console.log('---- ini decode -----', decoded)
      if(decoded.isAdmin === true){
        Article.create({
          title, shortDescription, imgUrl, content
        })
        .then(newArticle => {
          // console.log(newArticle)
          res.status(201).json(newArticle)
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Add article failed!'
          })
        })
      } else {
        res.status(401).json({
          err,
          message: 'Your have no access!'
        })
      }
    })
  }

  static getAllArticles(req, res){
    Article.find({})
    .then(articles => {
      res.status(201).json(articles)
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Articles not found!'
      })
    })
  }

  static getById(req, res){
    let id = req.params.id
    Article.findOne({_id: id})
    .populate('commentId')
    .exec(function (err, result) {
      if(err){
        res.status(400).json({
          err,
          message: 'Failed to find article!'
        })
      } else{
        res.status(200).json(result)
      }
    })
  }

  static edit(req, res){
    let id = req.params.id
    let {title, shortDescription, imgUrl, content} = req.body
    let token = req.headers.token
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
      if(decoded.isAdmin === true){
        Article.update({_id: id}, {
          $set: {
            title, shortDescription, imgUrl, content
          }
        })
        .then(updateArticle => {
          // console.log('ini updated=-----', updateArticle)
          res.status(201).json(updateArticle)
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to update article!'
          })
        })
      } else {
        res.status(401).json({
          err,
          message: 'You have no access to edit article!'
        })
      }
    })
  }

  static deleteArtcile(req, res){
    // console.log('masuk edit')
    let id = req.params.id
    let token = req.headers.token
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
      if(decoded.isAdmin === true){
        Article.deleteOne({_id: id})
        .then(deletedArticle => {
          // console.log('ini deleted=-----', typeof(deletedArticle))
          res.status(201).json({
            message: 'Delete article successfully!'
          })
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to delete article!'
          })
        })
      } else {
        res.status(401).json({
          err,
          message: 'You have no access to delete article!'
        })
      }
    })
  }
}

module.exports = ArticleController