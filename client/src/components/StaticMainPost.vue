<template>
  <div class="jumbotron p-3 p-md-5 bg-faded" id="mainpost">
    <div class="row">
      <div class="col-md-6 px-0">
        <h3 class="display-4 font-italic">Singapore - Malaysia by Bus</h3>
        <p class="lead my-3">Pergi dari satu negara ke negara lain menggunakan pesawat itu sudah biasa. Gimana kalau dilaluinya dengan perjalanan darat, Sudahkah kamu mencoba?</p>
        <p class="lead mb-0"><a href="#" class="text-blue">Continue reading...</a></p>
      </div>
      <div class="col-md-6 px-0">
        <img src="../assets/garden-by-the-bay.jpg" style="width:500px;border-radius:7px;">
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
