<template>
  <div id="home">
    <navi-bar class="homeNav">
      <div slot="center">购物街</div>
    </navi-bar>
    <tab-control v-show="isTabControl" :titles="['流行','新款','精选']" class="fixed" @itemClick="tabClick" ref="tabControl1"></tab-control>
    <my-scroll class="home-scroll" @pullingup="homeMoreGoods" ref="homeScroll" :type-num="3" @getPosition="backTopShow">
      <home-swiper :banners="banners" @imgLoad="getTCOffset"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @itemClick="tabClick" ref="tabControl2"></tab-control>
      <goods :goods="goods[currentType].data"></goods>
    </my-scroll>
    <back-top @click.native="backTopClick" v-show="ifBackTop" ></back-top>
  </div>

</template>

<script>
    import NaviBar from "components/common/navibar/NaviBar";
    import Goods from "components/common/goods/Goods"
    import TabControl from "components/common/tabcontrol/TabControl";
    import MyScroll from "components/common/scroll/MyScroll"
    import BackTop from "components/common/backtop/BackTop";


    import {getHomeMultiData,getGoods} from "network/home";
    import {debounce} from "common/utils";

    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommend from "./childComps/HomeRecommend";
    import HomeFeature from "./childComps/HomeFeature";

    export default {
        name: "Home",
        components: {BackTop, TabControl, HomeFeature, HomeRecommend, HomeSwiper, NaviBar,Goods,MyScroll},
        data(){
            return{
                banners:[],
                recommend:[],
                goods:{
                  pop:{page:1, data:[]},
                  new:{page:1, data:[]},
                  sell:{page:1, data:[]}
                },
                currentType:'pop',
              ifBackTop:false,
              tabControlOffset:0,
              isTabControl:false
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

      mounted(){
          //监听商品图片完成事件并刷新可滑动区域高度
        const refresh =debounce(this.$refs.homeScroll.refresh,500)
        this.$bus.$on('homeGoodsItemLoad',refresh)

      },

      updated(){
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

            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index


          },

          //上拉加载更多
          homeMoreGoods(){
            this.goods[this.currentType].page++
            getGoods(this.currentType,this.goods[this.currentType].page)
              .then(res=>{
                this.goods[this.currentType].data.push(...res.data.list)
              })
          },

          //点击按钮返回顶部
          backTopClick(){
            this.$refs.homeScroll.scrollTo(0,0,500)
          },

          //计算滚动属性判定要不要显示返回顶部按钮及显示顶部tabControl
          backTopShow(position){
            this.ifBackTop = position.y <-2000


            if(-position.y > this.tabControlOffset){
              this.isTabControl = true
            }
            else {
              this.isTabControl = false
            }
          },

          //轮播图加载完成时获得tabControl的Offset
          getTCOffset(){
            this.tabControlOffset = this.$refs.tabControl2.$el.offsetTop
          },

          //防抖函数

        }



    }
</script>

<style scoped>

  #home{
    /*padding-top: 44px;*/
    height: 100vh;
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

    background-color: #fff;


  }
  .home-scroll{
    height: calc(100vh - 93px);
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed{
    background-color: #fff;
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>