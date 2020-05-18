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
    <my-scroll class="content" ref="detailScroll" @getPosition="switchTheme">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images :images="detailImages" @imgLoad="imgLoad()"></detail-images>
      <detail-params :itemparams="itemParams" ref="params"></detail-params>
      <detail-comment :commentInfo="commentInfo" ref="comment"></detail-comment>
      <goods :goods="recommend" ref="recommend"></goods>
    </my-scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="ifBackTop" ></back-top>


  </div>
</template>

<script>
  import NaviBar from "components/common/navibar/NaviBar";
  import MyScroll from "components/common/scroll/MyScroll";
  import Goods from "components/common/goods/Goods"
  import BackTop from "components/common/backtop/BackTop";
  import {getGoodsDetail,GoodsInfo,Shop,getRecommend} from "network/detail";
  import {debounce} from "common/utils";

  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailImages from "./childComps/DetailImages";
  import DetailParams from "./childComps/DetailParams";
  import DetailComment from "./childComps/DetailComment";
  import DetailBottomBar from "./childComps/DetailBottomBar"

  export default {
    name: "Detail",
    components: {
      Goods,BackTop,
      GoodsInfo,
      DetailComment,
      DetailParams, DetailImages, MyScroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, NaviBar,DetailBottomBar},
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        goods:{},
        topImages:[],
        currentIndex:0,
        shop:{},
        detailImages:[],
        refresh:null,
        itemParams: {},
        commentInfo:{},
        recommend:[],
        ifBackTop:false,
        themesTops:[],
        themeTopsPush:null,
        GoodsId:''
      }
    },

    created() {
      //请求商品详情数据
      getGoodsDetail(this.$route.query.id)
        .then(res=>{
          //获取商品的id
          this.GoodsId = this.$route.query.id
          //轮播图地址赋值
          this.topImages=res.result.itemInfo.topImages
          //商品基本信息赋值
          this.goods= new GoodsInfo(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
          //店铺基本信息赋值
          this.shop = new Shop(res.result.shopInfo)
          //商品详情图片赋值
          this.detailImages.push(...res.result.detailInfo.detailImage[0].list)
          //商品参数信息赋值
          this.itemParams = res.result.itemParams
          //获取评论信息
          if(res.result.rate && res.result.rate.list){
            this.commentInfo = res.result.rate.list[0]
          }
        })

      //请求商品推荐信息
      getRecommend().then(res=>{
        this.recommend = res.data.list
      })
    },

    mounted(){
      //把myscroll中的refresh函数经过防抖处理后赋值给refresh
      this.refresh=debounce(this.$refs.detailScroll.refresh,500)
      this.$bus.$on('detailGoodsItemLoad',this.refresh)

      //把导航栏对应板块的offset值添加进this.themesTops的方法进行防抖处理并让themeTopsPush接收防抖后返回的函数
      this.themeTopsPush = debounce(()=>{
        this.themesTops=[]
        this.themesTops.push(0)
        this.themesTops.push(this.$refs.params.$el.offsetTop-44)
        this.themesTops.push(this.$refs.comment.$el.offsetTop-44)
        this.themesTops.push(this.$refs.recommend.$el.offsetTop-44)
      },500)
    },

    updated(){

    },


    methods:{
      //点击返回上一页
      navileft(){
        this.$router.back()
      },

      //点击更换导航栏颜色并跳转至相应板块
      titleClick(index){
        if(this.themesTops.length !==0){
          this.currentIndex=index
          this.$refs.detailScroll.scrollTo(0,-this.themesTops[index],500)
        }

      },

      //监听详情图片加载完成事件，调用refresh刷新函数及themeTopsPush函数
      imgLoad(){
        this.refresh()
        this.themeTopsPush()
      },

      //根据滚动切换导航栏标题及判定要不要显示返回顶部按钮
      switchTheme(position){
        //计算滚动属性判定要不要显示返回顶部按钮
        this.ifBackTop = position.y <-2000
        //根据滚动切换导航栏标题
        const length = this.themesTops.length
        if(length !==0){
          const positionY = -position.y
          for(let i=0;i<length;i++){
            //第一种写法，if嵌套
            if(this.currentIndex !== i){
              if(i<length-1 && positionY >= this.themesTops[i] && positionY < this.themesTops[i+1]){
                this.currentIndex=i
              }
              if(i===length-1 &&positionY >=this.themesTops[i]){
                this.currentIndex=i
              }
            }

            //第二种写法，if判断语句写在一起 但是当currentIndex===i===length-1时，this.currentIndex !== i会失效
            // if(this.currentIndex !== i && ((i<length-1)&&(positionY >= this.themesTops[i])&&(positionY < this.themesTops[i+1])) ||((i===length-1)&&(positionY >=this.themesTops[i]))){
            //   this.currentIndex=i
            //   console.log(i);
            // }

          }
        }
      },

      //点击按钮返回顶部
      backTopClick(){
        this.$refs.detailScroll.scrollTo(0,0,500)
      },

      //把商品加入到购物车
      addToCart(){
        //获取商品需要展示的信息
        const product = {}
        product.id = this.GoodsId;
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.newPrice = this.goods.nowPrice;

        //把商品信息添加到vuex中
        this.$store.dispatch('addCart',product)
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
    height: calc(100vh - 44px - 58px);
    bottom:58px
  }
</style>