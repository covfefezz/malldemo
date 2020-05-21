<template>
  <navi-bar class="cartNav">
    <div slot="center">购物车({{$store.state.cartList.length}})</div>
  </navi-bar>
  <my-scroll></my-scroll>
</template>

<script>
  import NaviBar from "components/common/navibar/NaviBar"
  import MyScroll from "components/common/scroll/MyScroll";
    export default {
        name: "Cart",
      components: {MyScroll, NaviBar}
    }
</script>

<style scoped>

  .cartNav{
    background-color: #FC4366;
  }
</style>