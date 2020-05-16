<template>
  <div class="detail-params" v-if="Object.keys(itemparams).length !==0">
    <table>
      <tr v-for="table in (itemparams.rule.tables)[0]">
        <td v-for="item in table">{{item}}</td>
      </tr>
    </table>
    <table class="'info-param">
      <tr v-for="info in itemparams.info.set">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailParams",
    props:{
      itemparams:Object
    }
  }
</script>

<style scoped>
  .detail-params {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .detail-params table {
    width: 100%;
    border-collapse: collapse;
  }

  .detail-params table tr {
    height: 42px;
  }

  .detail-params table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>