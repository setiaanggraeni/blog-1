<template>
  <div class="dashboard">
    <navbars/>
    <Dashboard/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard.vue'
import Navbars from '@/components/Navbar.vue'

export default {
  name: 'dashboard',
  components: {
    Dashboard, Navbars
  }
}
</script>
