<template>
  <div class="dashboard">
    <h3>Create New Post Content</h3><br>
    <form>
      <div class="form-group">
        <label>Content Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Short Description</label>
        <input type="text" class="form-control" v-model="shortDescription">
      </div>
      <div class="form-group">
        <label>Content</label><br>
        <wysiwyg v-model="theContent" />
      </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">Choose Picture</label>
          <input type="file" class="form-control-file" @change="getImage($event)">
          <button type="submit" class="btn btn-primary mb-2" @click.prevent="addContent">Submit Content</button>
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'dashboard',
  data () {
    return {
      title: '',
      shortDescription: '',
      theContent: '',
      url: ''
    }
  },
  mounted (){
    let token = localStorage.getItem('token')
  },
  methods: {
    getImage (image) {
      this.url = image.target.files[0]
      console.log(this.url)
    },
    addContent () {
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image', this.url)
      axios.post('http://localhost:3000/articles/upload', formData)
      .then(result => {
        axios.post('http://localhost:3000/articles/create', {
        title: this.title,
        shortDescription: this.shortDescription,
        imgUrl: result.data.link,
        content: this.theContent
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
            console.log('Failed create new content!')
          })
      })
      .catch(err => {
        console.log('Failed create new content!')
      })     
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
  label{
    float: left;
  }
  .dashboard{
    width: 90%;
    margin-left: 10%;
    // margin-top: 50px;
  }
</style>
