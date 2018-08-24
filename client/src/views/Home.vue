<template>
  <div class="home">
    <Navbars/>
    <Login @login="login" />
    <Register @register="register" />
    <!-- <MainPost/> -->

    <div class="container">
      <div class="row">
        <div class="col-sm-4" id="boxLeft">
          <Articles :allarticles="articles" @detail="detailArticle" @edit="editAricle" @deletearticle="deleteArticle" />
        </div>
        <div class="col-sm-8" id="boxRight">
          <div v-if="contentTrue">
            <TheArticle :content="content" @addcomment="addComment" @deletecomment="deleteComment"/>
          </div>
          <div v-else>
            <Dashboard :createoredit="editor" :foreditarticle="this.forEdit" @addcontent="addContent" @image="getImage"/>
          </div>
        </div>
      </div>
    </div>
    <ForFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Navbars from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import MainPost from '@/components/StaticMainPost.vue'
import ForFooter from '@/components/Footer.vue'
import Articles from '@/components/Articles.vue'
import Dashboard from '@/components/Dashboard.vue'
import TheArticle from '@/components/TheArticle.vue'

export default {
  name: 'home',
  components: {
    Navbars, Login, Register, MainPost, ForFooter, Articles, Dashboard, TheArticle
  },
  data () {
    return {
      articles: '',
      contentTrue: true,
      content: '',
      forEdit: '',
      editor: true
    }
  },
  mounted () {
    this.contentTrue = false
    this.getAllArticles()
  },
  methods: {
    getAllArticles () {
      axios.get('http://localhost:3000/articles')
        .then(dataArticles => {
          this.articles = dataArticles.data
        })
        .catch(err => {
         console.log(err.response.data.message)
        })
    },
    detailArticle (input){
      this.contentTrue = true
      this.content = input
    },
    editAricle (input){
      // console.log('ini input', input)
      this.forEdit = input
      this.editor = false
    },
    deleteArticle (id) {
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/articles/delete/${id}`, {
        headers: {
          token: token
        }
      })
        .then(articleDeleted => {
          console.log(articleDeleted)
          console.log('Article deleted!')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    login (input) {
      axios.post('http://localhost:3000/users/login', {
        email: input.email,
        password: input.password
      })
        .then(userLogin => {
          localStorage.setItem('token', userLogin.data.token)
          // localStorage.setItem('isAdmin', userLogin.data.isAdmin)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    register (input) {
      axios.post('http://localhost:3000/users/register', {
        name: input.name,
        email: input.email,
        password: input.password
      })
        .then(newUser => {
          console.log(newUser)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    getImage (image) {
      this.url = image.target.files[0]
    },
    addContent (input) {
      console.log('ini editor di add content', this.editor)
      console.log('ini forEdit di add content',this.forEdit)
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.url)
      axios.post('http://localhost:3000/articles/upload', formData)
        .then(result => {
          if(this.editor === true){
            axios.post('http://localhost:3000/articles/create', {
              title: input.title,
              shortDescription: input.shortDescription,
              imgUrl: result.data.link,
              content: input.theContent
            }, {
              headers: {
                token: token
              }
            })
              .then(newPost => {
                this.$router.push('/')
                console.log('Successfully create new content!')
              })
              .catch(err => {
                console.log(err.response.data.message)
                // console.log('Failed create new content!')
              })
          } else {
            axios.put(`http://localhost:3000/articles/edit/${this.forEdit._id}`, {
              title: input.title,
              shortDescription: input.shortDescription,
              imgUrl: result.data.link,
              content: input.theContent
            }, {
              headers: {
                token: token
              }
            })
            .then(newContent => {
              console.log('ini content baru ------ ', newContent)
            })
            .catch(err => {
              console.log(err.response.data.message)
            })
          }
        })
        .catch(err => {
          console.log(err.response.data.message)
          // console.log('Failed create new content!')
        })
    },
    addComment (input) {
      console.log(input.id)
      let token = localStorage.getItem('token')
      axios.post(`http://localhost:3000/articles/comment/${input.id}`, {
        comment: input.comment
      }, {
        headers: {
          token: token
        }
      })
      .then(newComment => {
        console.log('masuk comment berhasil ------ ', newComment)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
    },
    deleteComment (input) {
      console.log(input)
      let token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/articles/delete/comment/${input.commentId}`, {
        headers: {
          token: token
        }
      })
        .then(commentDeleted => {
          console.log(commentDeleted)
          console.log('Article deleted!')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>
