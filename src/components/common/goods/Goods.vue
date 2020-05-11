<template>
  <div class="goods">
    <!--<div><button @click="btnclick">anjian</button></div>-->
    <goods-item v-for="item in goods" :item="item"></goods-item>
  </div>
</template>

<script>

  import GoodsItem from "./GoodsItem"
  export default {
    name: "Goods",

    components:{GoodsItem},

    props:{
      goods:Array
    },

    methods:{
      btnclick(){
        console.log(this.goods)
      }
    }
  }
</script>

<style scoped>

  .goods{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>