<!--用的是better-scroll 1.X版本-->

<template>
  <div class="wrapper" ref="mywrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Scroll from "better-scroll"
  export default {
    name: "MyScroll",
    data(){
      return{
        bs:{},
      }
    },
    props:{
      typeNum:{
        type:Number,
        default:0
      }
    },
    mounted() {
      this.bs = new Scroll(this.$refs.mywrapper,{
        click:true,
        pullUpLoad:true,
        mouseWheel: true,
        probeType:this.typeNum
      })

      this.bs.on('pullingUp',()=>{
        this.$emit('pullingup')
        this.bs.finishPullUp()
      })

      this.bs.on('scroll',(position=>{
        this.$emit('getPosition',position)
      }))
    },

    methods:{
      refresh(){
        return this.bs.refresh()
      },

      scrollTo(x,y,delay){
        return this.bs.scrollTo(x,y,delay)
      }
    }
  }
</script>

<style scoped>

</style>