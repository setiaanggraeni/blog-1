<template>
  <div class="home">
    <Navbars/>
    <Login/>
    <Register/>
    <MainPost/>
    <GridHome :allarticles="articles" />
    <ForFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import  axios from 'axios'
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
  mounted (){
    this.getAllArticles()
  },
  data (){
    return {
      articles: ''
    }
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
    }
  }
}
</script>
