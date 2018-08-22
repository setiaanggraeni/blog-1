<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4" id="boxLeft">
        <!-- {{allarticles}} -->
        <h3 style="margin-top:0px;margin-bottom:15px;float:left;" class="font-italic">Articles</h3>
        <ul class="list-unstyled" v-for="(article, index) in allarticles" :key="index">
          <li class="media">
            <div class="row">
              <div class="col-sm-2">
                <img class="mr-3" :src="article.imgUrl" alt="Generic placeholder image" id="image">
              </div>
            <div class="col-sm-7" id="boxTextContent">
              <div class="media-body">
                <h6 class="mt-0 mb-1">{{article.title}}</h6>
                <p class="font-italic"> {{article.shortDescription}}</p>
              </div>
            </div>
            <div class="col-sm-3" id="boxOption" v-if="seen">
              <i class="far fa-edit"></i> ||
              <i class="far fa-trash-alt" @click="deleteArticle(article._id)"></i>
            </div>
            <div class="col-sm-3" id="boxOption" v-else>
            </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm-8" id="boxRight" v-if="isPost">
        <Dashboard @addcontent="addContent" @image="getImage" />
      </div>
      <div class="col-sm-3" id="boxOption" v-else>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'home',
  props: ['allarticles'],
  components: {
    Dashboard
  },
  data () {
    return {
      seen: true,
      isPost: true
    }
  },
  mounted () {
    let isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin === 'false' || isAdmin === null) {
      this.seen = false
      this.isPost = false
    }
  },
  methods: {
    deleteArticle (id) {
      this.$emit('deletearticle', id)
    },
    getImage (image) {
      this.url = image.target.files[0]
    },
    addContent (input) {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.url)
      axios.post('http://localhost:3000/articles/upload', formData)
        .then(result => {
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
              console.log(err)
              console.log('Failed create new content!')
            })
        })
        .catch(err => {
          console.log(err)
          console.log('Failed create new content!')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.media{
  width:100%;
}
#image{
  width: 50px;
}
#boxTextContent{
  text-align: left;
}
</style>
