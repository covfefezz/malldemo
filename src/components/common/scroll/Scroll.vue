<!--用的是better-scroll 2.0版本，但问题太多不能实现功能，已弃用-->

<template>
  <div class="wrapper" ref="scroller">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "@better-scroll/core"
  import Pullup from "@better-scroll/pull-up"
  import MouseWhell from "@better-scroll/mouse-wheel"

  BScroll.use(Pullup)
  BScroll.use(MouseWhell)
  export default {
    name: "Scroll",
    data(){
      return{
        bs:{}
      }
    },

    //创建组件时，先创建变量bs，用来在挂载组件时实例化BScroll对象
    created(){

    },
    //挂载此组件时实例化BScroll对象
    mounted() {
     this.bs = new BScroll(this.$refs.scroller,{
        scrollY:true,
        pullUpLoad:true,
       probeType:3,
       click:true,
       mouseWheel:{
          speed:2,
         invert:false,
         easeTime:300
       }
      })
      this.bs.refresh()
     this.bs.on('pullingUp',this.pullingUpHandler)
      console.log(Pullup)
    },

    methods:{
      pullingUpHandler(){
        console.log('shang la le')
        this.bs.finishPullUp()
      }
    }
  }
</script>

<style scoped>

  .wrapper{
    /*height:300px;*/
    /*overflow: hidden;*/
  }
</style>