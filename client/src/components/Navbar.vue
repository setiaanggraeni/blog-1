<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Setia's Blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" @keyup.enter="search(inputSearch)" v-model="inputSearch" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="search(inputSearch)">Search</button>
          <div v-if="seen">
            <button class="btn my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#modalLogin">Login</button>
            <button class="btn my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#modalRegister">Register</button>
          </div>
          <div v-else>
            <button class="btn my-2 my-sm-0" type="submit" @click="logout">Logout</button>
          </div>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbars',
  props: ['seen'],
  data () {
    return {
      inputSearch: ''
    }
  },
  methods: {
    search (inputSearch) {
      this.$emit('search', inputSearch)
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>

</style>
