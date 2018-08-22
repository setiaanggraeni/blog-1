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
            <div class="col-sm-3" id="boxOption" v-if="show">
              <i class="far fa-edit"></i> || 
              <i class="far fa-trash-alt"></i>
            </div>
            <div class="col-sm-3" id="boxOption" v-else>
            </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm-8" id="boxRight" v-if="seen">
        <Dashboard/>
      </div>
      <div class="col-sm-3" id="boxOption" v-else>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'home',
  props: ['msg', 'allarticles'],
  components: {
    Dashboard
  },
  data () {
    return {
      seen: true,
      show: true
    }
  },
  mounted (){
    let isAdmin = localStorage.getItem('isAdmin')
    let token = localStorage.getItem('token')
    console.log('ini admin g', isAdmin)
    if(isAdmin === false){
      this.seen = false
      this.show = false
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
// #boxLeft{
//   background-color: #42b983
// }

// #boxRight{
//   background-color: red
// }

#image{
  width: 50px;
}

#boxTextContent{
  // border: 1px solid black; width:100%;
  text-align: left;
}
</style>
