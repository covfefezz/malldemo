<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tabbar>
      <tabbar-item v-for="(item,index) in tabbarData" :tabbarDataName="item.name" :tabbarDataPath="(currentIndex===index?item.imgPath2:item.imgPath1)" :pathProp="item.path" @tabbarItemClick="setIndex(index)">
      </tabbar-item>
    </tabbar>
  </div>
</template>

<style>

</style>
<script>
    import Tabbar from "components/common/tabbar/Tabbar"
    import TabbarItem from "components/common/tabbar/TabbarItem";

    export default {
        components: {Tabbar,TabbarItem},
        data() {
            return {
                tabbarData: [
                    {
                        name: '首页',
                        imgPath1: require('assets/img/icon/shouye.svg'),
                        imgPath2: require('assets/img/icon/shouyefill.svg'),
                        path:'/home'
                    },
                    {
                        name: '分类',
                        imgPath1: require('assets/img/icon/dianpu.svg'),
                        imgPath2: require('assets/img/icon/dianpufill.svg'),
                        path:'/fenlei'
                    },
                    {
                        name: '购物车',
                        imgPath1: require('assets/img/icon/gouwuche.svg'),
                        imgPath2: require('assets/img/icon/gouwuchefill.svg'),
                        path:'/cart'
                    },
                    {
                        name: '我的',
                        imgPath1: require('assets/img/icon/yonghu.svg'),
                        imgPath2: require('assets/img/icon/yonghufill.svg'),
                        path:'/profile'
                    }
                ],
                currentIndex:0
            }
        },
        methods:{
            setIndex (index) {
                this.currentIndex=index
            }
        }

    }

</script>