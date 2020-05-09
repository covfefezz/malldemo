<template>
  <div class="navibar">
    <div class="navibarLeft"><slot name="left"></slot></div>
    <div class="navibarCenter"><slot name="center"></slot></div>
    <div class="navibarRight"><slot name="right"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "NaviBar"
    }
</script>

<style scoped>
  .navibar{
    height: 44px;
    line-height: 44px;
    display: flex;
    box-shadow: 0 1px 1px rgba(100,100,100,0.2);
    text-align:center;
  }
  .navibarLeft{
    width: 40px;
  }
  .navibarRight{
    width:40px;
  }
  .navibarCenter{
    flex: 1;
  }
</style>