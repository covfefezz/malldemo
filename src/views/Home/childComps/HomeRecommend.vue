<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HomeRecommend",
        props:{
            recommend:{
                type:Array,
                default:[]
            }
        }
    }
</script>

<style scoped>

  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size:14px;
    color: #1b1e21;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex:1;
  }
  .recommend a{
    text-decoration: none;
  }
  .recommend img{
    width: 65px;
    height: 65px;
  }
  .recommend p{
    margin: 10px 0;
  }
</style>