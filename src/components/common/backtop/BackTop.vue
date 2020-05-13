<template>
  <div class="backtop">
    <img src="~assets/img/icon/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>

  .backtop{
    position:fixed;
    right:8px;
    bottom: 55px;
  }
  .backtop img{
    height: 40px;
    width: 40px;
  }
</style>