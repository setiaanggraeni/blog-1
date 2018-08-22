<template>
  <div>
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Form Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Enter name">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter email">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="register">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/users/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(newUser => {
          console.log(newUser)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  label {
    float: left;
  }
</style>
