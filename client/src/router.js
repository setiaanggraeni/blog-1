import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TheArticle from './components/TheArticle.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/:id',
        name: 'detailArticle',
        component: TheArticle
      }]
    }
  ]
})
