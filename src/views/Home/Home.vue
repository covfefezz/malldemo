<template>
  <div>
    <navi-bar class="homeNav">
      <div slot="center">购物街</div>
    </navi-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
  </div>

</template>

<script>
    import NaviBar from "components/common/navibar/NaviBar";
    import {getHomeMultiData} from "network/home";
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommend from "./childComps/HomeRecommend";

    export default {
        name: "Home",
        components: {HomeRecommend, HomeSwiper, NaviBar},
        data(){
            return{
                banners:[],
                recommend:[]
            }
        },

        //获取首页数据信息
        created() {
            getHomeMultiData()
                .then(res =>{
                    this.banners = res.data.banner.list
                    this.recommend = res.data.recommend.list
                })
        }



    }
</script>

<style scoped>

  .homeNav{
    background-color: #FC4366;
    color:#ffffff;
  }
</style>