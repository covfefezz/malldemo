<template>
  <div id="tabbar">
    <slot></slot>
  </div>

</template>

<script>
    export default {
        name: "tabBar",


    }
</script>

<style scoped>

  #tabbar{
    display: flex;
    height: 49px;
    background-color: #F6F6F6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow:0 -1px 1px rgba(100,100,100,0.2);
  }


</style>