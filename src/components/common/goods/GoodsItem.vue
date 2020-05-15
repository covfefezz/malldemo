<template>
  <div class="goods-item" @click="goodsItemClick">
    <img  :src="item.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">¥{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props:{
      item:Object
    },
    methods:{
      //点击跳转进商品详情页
      goodsItemClick(){
        this.$router.push({
          path:'/detail',
          query:{
            id:this.item.iid
          }
        })
      },

      //商品图片加载完成通过事件总线发送事件给home
      imgLoad(){
        this.$bus.$emit('goodsItemLoad')
      }
    }
  }
</script>

<style scoped>

  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 10px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: #FC4366;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/icon/collect.svg") 0 0/14px 14px;
  }
</style>