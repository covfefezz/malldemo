<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions" >
      <swiper-slide v-for="item in banners" class="home-swiper">
        <a :href="item.link"><img :src="item.image" @load="imgLoad"></a>
      </swiper-slide>
      <!--分页器-->
      <div class="swiper-pagination" slot="pagination"></div>

      <!--左右箭头-->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'


    export default {
        name: "HomeSwiper",
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
                    //设置显示箭头
                    // navigation: {
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev'
                    // },
                    //自动轮播
                    autoplay: {
                        delay: 2000,
                        //当用户滑动图片后继续自动轮播
                        disableOnInteraction: false,
                    },
                    //切换效果
                    effect:'flip',

                    //开启循环模式
                    loop: true
                },
              isLoad:false

            }
        },
        props:{
            //轮播图数组
            banners:{
                type:Array,
                default:{}
            }
        },

      methods: {
        //判断轮播图是否加载完成
        imgLoad(){
          if(this.isLoad == false){
            this.$emit('imgLoad')
            this.isLoad = true
          }
        }
      }
    }
</script>

<style scoped>
  .home-swiper img{
    width: 100%;
  }
</style>