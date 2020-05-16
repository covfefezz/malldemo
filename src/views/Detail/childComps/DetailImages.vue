<template>
  <div class="detail-images">
    <div v-for="item in images" class="detail-images-item">
      <img :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailImages",
    props:{images:Array},
    methods:{
      imgLoad(){
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>

  .detail-images-item img{
    width:100%;
  }
</style>