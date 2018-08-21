var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()
chai.use(chaiHttp)
chai.should()


const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpass}@ds247141.mlab.com:47141/tddblog`, { useNewUrlParser: true })
const User = require('../models/user')
const Artcile = require('../models/article')
const ModelComment = require('../models/comment')

var base_url = 'http://localhost:3000'
describe('User', function() {

  after(function(done){
    User.collection.drop()
    Artcile.collection.drop()
    ModelComment.collection.drop()
    done()
  })

  it('POST /users/register should return an object new user register', function(done) {
    chai.request(base_url)
    .post('/users/register')
    .send({
      name: 'setia',
      email: 'setia@mail.com',
      password: '12345'
    })
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('name')
      res.body.should.have.property('email')
      res.body.should.have.property('password')
      res.body.name.should.equal('setia')
      res.body.email.should.equal('setia@mail.com')
      done()
    })
  })

  it('POST /users/login should return an object that filled token', function(done) {
    chai.request(base_url)
    .post('/users/login')
    .send({
      email: 'setia@mail.com',
      password: '12345'
    })
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('token')
      done()
    })
  })

  it('POST /articles/create should return an object new article', function(done) {
    chai.request(base_url)
    .post('/articles/create')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2JmM2Y4YTkxZTM1NDE5OWNiMGM5OCIsIm5hbWUiOiJzZXRpYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDg1MDExMn0.Jk1K3t98SeQX588tpvgphQa_IOKq3h7K8d_7UkmmiWg')
    .send({
      title: 'Haloo',
      shortDescription: 'ini test',
      imgUrl: 'https://www.phnompenhpost.com/sites/default/files/styles/full-screen_watermarked/public/field/image/13_Dim-sum-at-Yi-Sang%E2%80%99s-new-location-is-served-in-traditional-steaming-baskets.jpg?itok=27PdOplS',
      content: 'test bangettttttt lho!'
    })
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('title')
      res.body.should.have.property('shortDescription')
      res.body.should.have.property('imgUrl')
      res.body.should.have.property('content')
      res.body.title.should.equal('Haloo')
      res.body.shortDescription.should.equal('ini test')
      res.body.imgUrl.should.equal('https://www.phnompenhpost.com/sites/default/files/styles/full-screen_watermarked/public/field/image/13_Dim-sum-at-Yi-Sang%E2%80%99s-new-location-is-served-in-traditional-steaming-baskets.jpg?itok=27PdOplS')
      res.body.content.should.equal('test bangettttttt lho!')
      done()
    })
  })

  it('GET /articles should return an array of object articles', function(done) {
    chai.request(base_url)
    .get('/articles')
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('array')
      done()
    })
  })

  it('GET /articles/find/:id should return one article', function(done) {
    chai.request(base_url)
    .get('/articles/find/' + '5b7bf9c0251a7445d53f820f')
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      done()
    })
  })

  it('PUT /articles/edit/:id should return an object of edited article', function(done) {
    chai.request(base_url)
    .put('/articles/edit/' + '5b7bf9c0251a7445d53f820f')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2JmM2Y4YTkxZTM1NDE5OWNiMGM5OCIsIm5hbWUiOiJzZXRpYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDg1MDExMn0.Jk1K3t98SeQX588tpvgphQa_IOKq3h7K8d_7UkmmiWg')
    .send({
      title: 'Update',
      shortDescription: 'ini update',
      imgUrl: 'https://www.phnompenhpost.com/sites/default/files/styles/full-screen_watermarked/public/field/image/13_Dim-sum-at-Yi-Sang%E2%80%99s-new-location-is-served-in-traditional-steaming-baskets.jpg?itok=27PdOplS',
      content: 'update bangettttttt lho!'
    })
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('title')
      res.body.should.have.property('shortDescription')
      res.body.should.have.property('imgUrl')
      res.body.should.have.property('content')
      res.body.title.should.equal('Haloo')
      res.body.shortDescription.should.equal('ini test')
      res.body.imgUrl.should.equal('https://www.phnompenhpost.com/sites/default/files/styles/full-screen_watermarked/public/field/image/13_Dim-sum-at-Yi-Sang%E2%80%99s-new-location-is-served-in-traditional-steaming-baskets.jpg?itok=27PdOplS')
      res.body.content.should.equal('test bangettttttt lho!')
      done()
    })
  })

  it('DELETE /articles/delete/:id should return object', function(done) {
    chai.request(base_url)
    .delete('/articles/delete/' + '5b7bf9c0251a7445d53f820f')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2JmM2Y4YTkxZTM1NDE5OWNiMGM5OCIsIm5hbWUiOiJzZXRpYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDg1MDExMn0.Jk1K3t98SeQX588tpvgphQa_IOKq3h7K8d_7UkmmiWg')
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('message')
      done()
    })
  })

  it('POST /articles/comment/:articleId should return an object that filled new comment', function(done) {
    chai.request(base_url)
    .post('/articles/comment/' + '5b7bf9c0251a7445d53f820f')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2JmM2Y4YTkxZTM1NDE5OWNiMGM5OCIsIm5hbWUiOiJzZXRpYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDg1MDExMn0.Jk1K3t98SeQX588tpvgphQa_IOKq3h7K8d_7UkmmiWg')
    .send({
      comment: 'ngetset comment',
      userId: '5b7bf3f8a91e354199cb0c98',
      username: 'setia'
    })
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('newComment')
      res.body.newComment.should.have.property('comment')
      res.body.newComment.should.have.property('userId')
      res.body.newComment.should.have.property('username')
      res.body.newComment.comment.should.equal('ngetset comment')
      done()
    })
  })

  it('DELETE /articles/delete/comment/:id should return object', function(done) {
    chai.request(base_url)
    .delete('/articles/delete/comment/' + '5b7c4a017ac5e574deab19d0')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2JmM2Y4YTkxZTM1NDE5OWNiMGM5OCIsIm5hbWUiOiJzZXRpYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNDg1MDExMn0.Jk1K3t98SeQX588tpvgphQa_IOKq3h7K8d_7UkmmiWg')
    .end(function(err, res){
      res.should.have.status(201)
      res.body.should.be.a('object');
      res.body.should.have.property('message')
      done()
    })
  })

})
