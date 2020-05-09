<template>
  <navi-bar class="homeNav">
    <div slot="center">购物街</div>
  </navi-bar>
</template>

<script>
    import NaviBar from "components/common/navibar/NaviBar";
    export default {
        name: "Home",
        components: {NaviBar}
    }
</script>

<style scoped>

  .homeNav{
    background-color: #FC4366;
    color:#ffffff;
  }
</style>