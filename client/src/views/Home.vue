<template>
  <div class="home">
    <Navbars/>
    <Login @login="login" />
    <Register @register="register" />
    <MainPost/>
    <GridHome :allarticles="articles" @deletearticle="deleteArticle" />
    <ForFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import GridHome from '@/components/GridHome.vue'
import Navbars from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import MainPost from '@/components/StaticMainPost.vue'
import ForFooter from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Navbars, Login, Register, GridHome, MainPost, ForFooter
  },
  data () {
    return {
      articles: ''
    }
  },
  mounted () {
    this.getAllArticles()
  },
  methods: {
    getAllArticles () {
      axios.get('http://localhost:3000/articles')
        .then(dataArticles => {
          this.articles = dataArticles.data
        })
        .catch(err => {
          console.log(err)
        })
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
          console.log('ini yang error', err)
        })
    },
    login (input) {
      axios.post('http://localhost:3000/users/login', {
        email: input.email,
        password: input.password
      })
        .then(userLogin => {
          localStorage.setItem('token', userLogin.data.token)
          localStorage.setItem('isAdmin', userLogin.data.isAdmin)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
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
          console.log(err.message)
        })
    }
  }
}
</script>
