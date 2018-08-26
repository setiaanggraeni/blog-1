<template>
  <div>
    <h3 style="margin-top:0px;margin-bottom:15px;float:left;" class="font-italic">Articles</h3>
      <ul class="list-unstyled" v-for="(article, index) in allarticles" :key="index">
        <li class="media">
          <div class="row">
            <div class="col-sm-2">
              <img class="mr-3" :src="article.imgUrl" alt="Generic placeholder image" id="image">
            </div>
          <div class="col-sm-7" id="boxTextContent">
            <div class="media-body">
              <div id="posted">Posted by: {{article.userId.name}}, {{(article.createdAt).slice(0,10)}}</div>
              <router-link :to="{name: 'detailArticle', params: {id: article.title}}" class="mt-0 mb-1" @click.native="detail(article)">{{article.title}}</router-link>
              <p class="font-italic"> {{article.shortDescription}}</p>
            </div>
          </div>
          <div v-if="edittrue">
            <i class="far fa-edit" @click="editArticle(article)"></i> ||
            <i class="far fa-trash-alt" @click="deleteArticle(article._id)"></i>
          </div>
          <div v-else>
          </div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'articles',
  props: ['allarticles', 'edittrue'],
  components: {
    Dashboard
  },
  methods: {
    deleteArticle (id) {
      this.$emit('deletearticle', id)
    },
    detail (input) {
      this.$emit('detail', input)
    },
    editArticle (article) {
      this.$emit('edit', article)
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
#posted{
  color: gray;
  font-size: 10px;
  font-style: italic;
}
</style>
