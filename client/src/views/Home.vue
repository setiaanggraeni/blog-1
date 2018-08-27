<template>
  <div class="home">
    <Navbars @search="search" :seen="seen" @logout="logout"/>
    <Login @login="login" />
    <Register @register="register" />
    <MainPost/>

    <div class="container">
      <div class="row">
        <div class="col-sm-4" id="boxLeft">
          <Articles :allarticles="articles" :edittrue="edittrue" @detail="detailArticle" @edit="editAricle" @deletearticle="deleteArticle" />
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
      editor: true,
      articleSearch: '',
      seen: true,
      edittrue: false
    }
  },
  watch: {
    articles: 'getAllArticles',
    seen (val) {
      this.seen = val
    },
    '$route' (to, from) {
      if (this.$route.params.id === undefined) {
        this.contentTrue = false
      } else {
        this.contentTrue = true
        this.detailArticle(this.$route.params.id)
      }
    },
    content (val) {
      this.detailArticle(val._id)
      // console.log('content', val)
    }
  },
  mounted () {
    this.contentTrue = false
    this.getAllArticles()
    let token = localStorage.getItem('token')
    if (token) {
      this.seen = false,
      this.edittrue = true
    }
    if(this.$route.params.id !== undefined){
      this.contentTrue = true
        this.detailArticle(this.$route.params.id)
    }
  },
  methods: {
    getAllArticles () {
      axios.get('https://blogserver.setiaanggraeni.co/articles')
        .then(dataArticles => {
          this.articles = dataArticles.data
        })
        .catch(err => {
         console.log(err.response.data.message)
        })
    },
    detailArticle (input){
      this.contentTrue = true
      axios.get(`https://blogserver.setiaanggraeni.co/articles/find/${input}`)
      .then(article => {
        this.content = article.data
      })
      .catch(err => {
        swal('Ups!', 'Failed to load content!', 'warning')
      })
    },
    editAricle (input){
      this.forEdit = input
      this.editor = false
    },
    deleteArticle (id) {
      let token = localStorage.getItem('token')
      axios.delete(`https://blogserver.setiaanggraeni.co/articles/delete/${id}`, {
        headers: {
          token: token
        }
      })
        .then(articleDeleted => {
          swal('Yeayyy!', 'Article deleted!', 'success')
        })
        .catch(err => {
          swal('Failed!', 'You have no access to delete this content!', 'warning')
        })
    },
    login (input) {
      axios.post('https://blogserver.setiaanggraeni.co/users/login', {
        email: input.email,
        password: input.password
      })
        .then(userLogin => {
          this.seen = false
          this.edittrue = true
          localStorage.setItem('token', userLogin.data.token)
        })
        .catch(err => {
          swal('Failed!', 'Login failed! Please check your credential!', 'warning')
          console.log(err.response.data.message)
        })
    },
    logout () {
      this.seen = true
      this.edittrue = false
      localStorage.clear()
    },
    register (input) {
      axios.post('https://blogserver.setiaanggraeni.co/users/register', {
        name: input.name,
        email: input.email,
        password: input.password
      })
        .then(newUser => {
          this.seen = false
          this.edittrue = true
          localStorage.setItem('token', newUser.data.token)
        })
        .catch(err => {
          swal('Failed!', 'Register failed! Please follow the instruction!', 'warning')
          console.log(err.response.data.message)
        })
    },
    getImage (image) {
      this.url = image.target.files[0]
    },
    addContent (input) {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.url)
      axios.post('https://blogserver.setiaanggraeni.co/articles/upload', formData)
        .then(result => {
          if(this.editor === true){
            axios.post('https://blogserver.setiaanggraeni.co/articles/create', {
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
                swal('Yeayyy!', 'Add content success!', 'success')
              })
              .catch(err => {
                swal('Failed!', 'Please login!', 'warning')
              })
          } else {
            axios.put(`https://blogserver.setiaanggraeni.co/articles/edit/${this.forEdit._id}`, {
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
              swal('Yeayyy!', 'Edit content success!', 'success')
            })
            .catch(err => {
              swal('Failed!', 'Edit content failed! You have no access to edit this content!', 'warning')
            })
          }
        })
        .catch(err => {
          swal('Failed!', 'Create content failed! Please check your login status!', 'warning')
        })
    },
    addComment (input) {
      let token = localStorage.getItem('token')
      axios.post(`https://blogserver.setiaanggraeni.co/articles/comment/${input.id}`, {
        comment: input.comment
      }, {
        headers: {
          token: token
        }
      })
      .then(newComment => {
        swal('Yeayyy!', 'Add comment success!', 'success')
      })
      .catch(err => {
        swal('Failed!', 'Create comment failed! Please check your login status!', 'warning')
        console.log(err.response.data.message)
      })
    },
    deleteComment (input) {
      let token = localStorage.getItem('token')
      axios.delete(`https://blogserver.setiaanggraeni.co/articles/delete/comment/${input.commentId}`, {
        headers: {
          token: token
        }
      })
        .then(commentDeleted => {
        //  this.detailArticle()
          swal('Yeayyy!', 'Article deleted!', 'success')
        })
        .catch(err => {
          swal('Failed!', 'You have no access to delete this comment!', 'warning')
          console.log(err.response.data.message)
        })
    },
    search (input) {
      axios.get(`https://blogserver.setiaanggraeni.co/articles/search?q=${input}`)
        .then(articles => {
          this.articles = articles.data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>
