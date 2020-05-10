<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:currentIndex===index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:Array
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex = index
            }
        }
    }
</script>

<style scoped>

  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
  }
  .tab-control-item{
    flex:1
  }
  .tab-control-item span{
    padding:5px;
  }
  .active{
    color:#FC4366
  }

  .active span{
    border-bottom: 2px solid #FC4366;
  }
</style>