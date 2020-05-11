<template>
  <div id="home">
    <navi-bar class="homeNav">
      <div slot="center">购物街</div>
    </navi-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <home-feature></home-feature>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @itemClick="tabClick"></tab-control>
    <goods :goods="goods[currentType].data"></goods>
    <button @click="homeClick">点击加载更多</button>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
    </ul>
  </div>

</template>

<script>
    import NaviBar from "components/common/navibar/NaviBar";
    import Goods from "components/common/goods/Goods"
    import {getHomeMultiData,getGoods} from "network/home";
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommend from "./childComps/HomeRecommend";
    import HomeFeature from "./childComps/HomeFeature";
    import TabControl from "components/common/tabcontrol/TabControl";

    export default {
        name: "Home",
        components: {TabControl, HomeFeature, HomeRecommend, HomeSwiper, NaviBar,Goods},
        data(){
            return{
                banners:[],
                recommend:[],
                goods:{
                  pop:{page:1, data:[]},
                  new:{page:1, data:[]},
                  sell:{page:1, data:[]}
                },
                currentType:'pop'
            }
        },

        
        created() {
          //获取首页数据信息
            getHomeMultiData()
                .then(res =>{
                    this.banners = res.data.banner.list
                    this.recommend = res.data.recommend.list
                })
          //获取商品信息
          getGoods('pop',1)
            .then(res=>{
              this.goods.pop.data.push(...res.data.list)
            })

        },
        
        
        methods:{
          //点击tabControl更换商品展示
          tabClick(index){
            switch (index) {
              case 0:
                this.currentType = 'pop'
                break;
              case 1:
                this.currentType = 'new'
                break;
              case 2:
                this.currentType = 'sell'
                break;
            }
            if(this.goods[this.currentType].data.length ===0){
              getGoods(this.currentType,this.goods[this.currentType].page)
                .then(res=>{
                  this.goods[this.currentType].data.push(...res.data.list)
                })
            }

          },

          //点击加载更多，获得更多商品展示
          homeClick(){
            this.goods[this.currentType].page++
            getGoods(this.currentType,this.goods[this.currentType].page)
              .then(res=>{
                this.goods[this.currentType].data.push(...res.data.list)
              })
          }
        }



    }
</script>

<style scoped>

  #home{
    padding-top: 44px;
  }
  .homeNav{
    background-color: #FC4366;
    color:#ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index:9
  }
  .tab-control{
    position: sticky;
    top:44px;
    background-color: #fff;
    z-index: 9;
  }
</style>