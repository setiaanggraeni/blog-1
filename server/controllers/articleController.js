const jwt = require('jsonwebtoken')
const Article = require('../models/article')
const User = require('../models/user')

class ArticleController{
  static addArticle(req, res){
    let {title, shortDescription, imgUrl, content} = req.body
    Article.create({
      title, shortDescription, imgUrl, content, userId: req.user._id
    })
    .then(newArticle => {
      res.status(201).json(newArticle)
    })
    .catch(err => {
      res.status(400).json({
        err,
        message: 'Add article failed!'
      })
    })
  }

  static getAllArticles(req, res){
    Article.find({})
    .populate('commentId')
    .populate('userId')
    .exec(function(err, articles){
      if(err) res.status(400).json({err, message: 'Artciles not found!'})
      res.status(201).json(articles)
    })
  }

  static getById(req, res){
    let id = req.params.id
    Article.findOne({_id: id})
    .populate('commentId')
    .populate('userId')
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
    // console.log('ini user dr auth ====== ', req.user)
    let id = req.params.id
    let {title, shortDescription, imgUrl, content} = req.body
    Article.findOne({_id: id})
    .then(article => {
      // console.log('----article----',article.userId._id)
      // console.log('----user----',req.user._id)
      if(String(article.userId._id) == String(req.user._id)){
        Article.update({_id: id}, {
          $set: {
            title, shortDescription, imgUrl, content
          }
        })
        .then(updateArticle => {
          res.status(201).json(updateArticle)
        })
        .catch(err => {
          res.status(400).json({
            err,
            message: 'Failed to update article!'
          })
        })
      } else {
        res.status(400).json({
          message: 'you have no access to edit this article!'
        })
      }
    })
  }

  static deleteArticle(req, res){
    let id = req.params.id
    Article.findOne({_id: id})
    .then(article => {
      if(String(article.userId._id) == String(req.user._id)){
        Article.deleteOne({_id: id})
        .then(deletedArticle => {
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
        res.status(400).json({
          message: 'you have no access to delete this article!'
        })
      }
    })
  }

  static search (req, res) {
    Article.find({
      $or: [{title: new RegExp(req.query.q, 'i')},
            {shortDescription: new RegExp(req.query.q, 'i')},
            {content: new RegExp(req.query.q, 'i')}
            ]
    })
    .then(artciles => {
      res.status(201).json(artciles)
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
  }
}

module.exports = ArticleController