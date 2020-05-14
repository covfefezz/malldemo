<template>
  <div>
    <swiper  :options="swiperOptions" >
      <swiper-slide v-for="item in images" class="detail-swiper">
        <img :src="item" alt="">
      </swiper-slide>
      <!--分页器-->
      <div class="swiper-pagination" slot="pagination"></div>

    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'


  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperSlide,
      directive
    },
    data() {
      return {
        //设置轮播选项
        swiperOptions: {
          //显示分页
          pagination: {
            el: '.swiper-pagination'
          },
          //自动轮播
          autoplay: {
            delay: 2000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //切换效果
          // effect:'flip',

          //开启循环模式
          loop: true,


        },
      }
    },
    props:{
      //轮播图数组
      images:{
        type:Array,
        default:[]
      }
    },

    created(){

    },
    mounted(){
    },
    methods: {
      //判断轮播图是否加载完成

    }
  }
</script>

<style scoped>
  .detail-swiper{
    /*width: 100%;*/
    height: 300px;
    overflow: hidden;
  }
</style>