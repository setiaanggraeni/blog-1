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
  methods: {
    getImage (imageFile) {
      this.$emit('image', imageFile)
    },
    addContent () {
      this.$emit('addcontent', {title: this.title, shortDescription: this.shortDescription, theContent: this.theContent, url: this.url})
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
  }
</style>
