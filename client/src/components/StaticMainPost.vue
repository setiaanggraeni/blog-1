<template>
  <div class="jumbotron p-3 p-md-5 bg-faded" id="mainpost">
    <div class="row">
      <div class="col-md-6 px-0">
        <h3 class="display-4 font-italic">Be Creative by Write Your Own Blog Here</h3>
        <p class="lead my-3">Social blogs and social blogging are phrases used to describe second-generation Internet publishing tools that blend features of both traditional blogging and social networking.</p>
      </div>
      <div class="col-md-6 px-0">
        <img src="https://cdn.pixabay.com/photo/2018/04/13/16/49/laptop-3317007__480.jpg" style="width:500px;border-radius:7px;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainPost',
  props: []
}
</script>

<style scoped lang="scss">
  #mainpost {
    width: 90%;
    margin-left: 5%;
    text-align: left;
    margin-top: 20px;
  }
</style>
