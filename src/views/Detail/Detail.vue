<template>
  <div class="detail">
    <navi-bar class="navi">
      <div slot="left" class="navileft" @click="navileft">
        <img src="~assets/img/icon/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active: currentIndex === index}" @click="titleClick(index)">{{item}}</div>
      </div>
    </navi-bar>
    <my-scroll class="content">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
      </ul>
    </my-scroll>

  </div>
</template>

<script>
  import NaviBar from "components/common/navibar/NaviBar";


  import {getGoodsDetail,Goods,Shop} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import MyScroll from "components/common/scroll/MyScroll";

  export default {
    name: "Detail",
    components: {MyScroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, NaviBar},
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        goods:{},
        topImages:[],
        currentIndex:0,
        shop:{}
      }
    },

    created() {
      getGoodsDetail(this.$route.query.id)
        .then(res=>{
          this.topImages=res.result.itemInfo.topImages
          this.goods= new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
          this.shop = new Shop(res.result.shopInfo)
        })
    },


    methods:{
      //点击返回上一页
      navileft(){
        this.$router.back()
      },

      //点击更换导航栏颜色
      titleClick(index){
        this.currentIndex=index
      }
    }
  }
</script>

<style scoped>
  .navi{
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .title{
    display:flex;
    padding: 0 40px;
    font-size:13px;
  }
  .title-item{
    flex:1;
  }
  .navileft{
    margin-top:5px;
  }
  .navileft img{
    height:20px;
    width: 20px;
  }
  .active{
    color: #FC4366;
  }
  .detail{
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content{
    height: calc(100vh - 44px);
  }
</style>