var express = require('express');
var router = express.Router();
const {addArticle, getAllArticles, getById, edit, deleteArticle} = require('../controllers/articleController')
const {addComment, deleteComment} = require('../controllers/commentController')
const {auth} = require('../middleware/auth')
const images = require('../helpers/images')

router.post('/create', auth, addArticle)
      .get('/', getAllArticles)
      .get('/find/:id', getById)
      .put('/edit/:id', auth, edit)
      .delete('/delete/:id', auth, deleteArticle)
      .post('/comment/:articleId', auth, addComment)
      .delete('/delete/comment/:id', auth, deleteComment)

router.post('/upload',
images.multer.single('image'), 
images.sendUploadToGCS,
(req, res) => {
      res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
      })
})

module.exports = router;
