<template>
  <div class="cart">
    <navi-bar class="cartNav">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </navi-bar>
    <my-scroll class="cartScroll">
      <cart-list :cartList="$store.state.cartList"></cart-list>
    </my-scroll>
    <bottom-bar></bottom-bar>
  </div>

</template>

<script>
  import NaviBar from "components/common/navibar/NaviBar"
  import MyScroll from "components/common/scroll/MyScroll";
  import CartList from "./childComps/CartList"
  import BottomBar from "./childComps/BottomBar";
    export default {
        name: "Cart",
      components: {BottomBar, MyScroll, NaviBar,CartList},
      computed:{

      },
      methods:{

      }
    }
</script>

<style scoped>

  .cart{
    height: 100vh;
  }
  .cartNav{
    background-color: #FC4366;
    position: relative;
  }
  .cartScroll{
    height:calc(100vh - 40px - 49px);
    /*position: absolute;*/
    overflow: hidden;
  }
</style>