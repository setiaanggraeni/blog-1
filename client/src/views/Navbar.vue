<template>
  <div class="home">
    <Navbars/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbars from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbars
  }
}
</script>
