var express = require('express');
var router = express.Router();
const {addArticle, getAllArticles, getById, edit, deleteArtcile} = require('../controllers/articleController')
const {addComment, deleteComment} = require('../controllers/commentController')
const {auth} = require('../middleware/auth')

router.post('/create', auth, addArticle)
      .get('/', getAllArticles)
      .get('/find/:id', getById)
      .put('/edit/:id', auth, edit)
      .delete('/delete/:id', auth, deleteArtcile)
      .post('/comment/:articleId', auth, addComment)
      .delete('/delete/comment/:id', auth, deleteComment)

module.exports = router;
