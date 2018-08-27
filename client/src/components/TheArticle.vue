<template>
  <div>
    <h3>{{content.title}}</h3>
    <img :src="content.imgUrl" id="image"><br><br>
    <div id="content">
      <h5>{{content.shortDescription}}</h5>
      {{content.content}}
      <hr>
      <h3>All Comments</h3>
      <div v-for="(comment, index) in content.commentId" v-bind:key="index">
        <div class="row">
          <div class="col-md-8" id="commentBox">
            <a id="usernameComment">{{comment.username}}</a>
            <a id="time">{{comment.createdAt.slice(0,10)}}</a>
            <br>
            {{comment.comment}}
            <br>
            <i class="far fa-trash-alt" id="deleteComment" @click="deleteComment({commentId: comment._id, userId: comment.userId})"></i>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="form-group forComment" v-if="commenttrue">
      <label for="comment" style="font-size:20px;float:left">Leave a comment: </label>
      <textarea class="form-control col-md-9" v-model="inputComment" rows="3"></textarea>
      <button type="button" id="addComment" class="btn btn-success" @click="addComment">Comment</button>
    </div>
    <div v-else>
      <label for="comment" style="font-size:20px;">Please login to leave a comment:</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thearticle',
  props: ['content'],
  data () {
    return {
      inputComment: '',
      commenttrue: ''
    }
  },
  // watch: {
  //   content (val) {
  //     this.content = val
  //   }
  // },
  mounted () {
    let token = localStorage.getItem('token')
    if (token) {
      this.commenttrue = true
    }
  },
  methods: {
    addComment () {
      this.$emit('addcomment', {comment: this.inputComment, id: this.content._id})
    },
    deleteComment (input) {
      this.$emit('deletecomment', input)
    }
  }
}
</script>

<style scoped lang="scss">
#image{
  width: 400px;
}
#content{
  text-align: justify;
}
#commentBox{
  margin-left:15px;
  border:1px solid grey;
  border-radius:7px;
  width:100%;
}
#time{
  font-size:12px;
  color:grey;
}
#usernameComment{
  font-size:17px;
  color:blue;
  margin-right:5px;
}
#addComment{
  float: right;
  margin-right: 20px;
}
#deleteComment{
  float: right;
  margin-bottom: 3px;
}
</style>
