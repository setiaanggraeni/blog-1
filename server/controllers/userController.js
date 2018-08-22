const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(8);

class UserController{
  static register(req, res){
    let {name, email, password} = req.body
    var hash = bcrypt.hashSync(password, salt)
    User.findOne({email:email})
    .then(user => {
      if(!user){
        User.create({
          name, email, password: hash
        })
        .then(newUser => {
          res.status(201).json(newUser)
        })
        .catch(err => {
          // console.log(err)
          res.status(400).json(err.message)
        })
      } else {
        // console.log('--------', err)
        res.status(400).json({
          err,
          message: 'Email already exist!'
        })
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static login(req, res){
    let {email, password} = req.body
    User.findOne({email: email})
    .then(user => {
      if(user){
        // console.log('ini user =======' ,user)
        let compare = bcrypt.compareSync(password, user.password)
        if(compare){
          jwt.sign({id: user._id, name: user.name, isAdmin: user.isAdmin}, process.env.secretKey, function(err, token) {
            res.status(201).json({token: token, isAdmin: user.isAdmin})
          })
        } else {
          res.status(400).json({
            err,
            message: 'Wrong password!'
          })
        }
      } else {
        res.status(400).json({
          err,
          message: 'Email not found!'
        })
      }
    })
  }
}

module.exports = UserController