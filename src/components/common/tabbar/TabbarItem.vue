<template>
    <div class="tabbar-item" @click="tabbarItemClick">
      <img :src="tabbarnrPath">
      <p>{{tabbarnrName}}</p>
    </div>
</template>

<script>
    export default {
        name: "tabbarItem",
        props:[
            'tabbarDataName','tabbarDataPath','pathProp'
        ],
        data(){
            return{
                tabbarnrName:this.tabbarDataName,
                tabbarnrPath:this.tabbarDataPath,
                path:this.pathProp
            }
        },
        methods:{
            tabbarItemClick(){
                this.$router.replace(this.path).catch(err =>{})//捕获连续点击同一item报错的异常
                // this.$router.replace(this.path)
                this.$emit('tabbarItemClick')
            }
        },
        watch:{
            tabbarDataPath(newValue){
                this.tabbarnrPath = newValue
            }
        }
    }
</script>

<style scoped>
  .tabbar-item{
    flex:1;
    text-align: center;
    vertical-align: middle;
  }

  .tabbar-item img{
    width:24px;
    height: 24px;
    margin-top: 3px;
  }

  .tabbar-item p{
    margin:0;
    font-size:12px
  }
</style>