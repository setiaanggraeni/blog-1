<template>
  <div class="home">
    <Navbars/>
    <Login/>
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbars from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    Navbars, Login, Register
  }
}
</script>
