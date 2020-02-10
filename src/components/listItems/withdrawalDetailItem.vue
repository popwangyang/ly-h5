<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item v-for="(item, index) in dataList" :key="index">
      <span class="flx" slot="title">
        <div class="flex-wrapper">
          <span>{{item.time}}</span>
          <span>{{item.stat| status}}</span>
        </div>
        <div class="flex-wrapper flex-add or">
          <span>￥{{item.money|toFixed2}}</span>
          <span>实际到账：￥{{item.nowMoney|toFixed2}}</span>
        </div>
      </span>
      <span class="flx">
        <div class="flex-wrapper">
          <span>支付通道费率</span>
          <span>提现手续费</span>
        </div>
        <div class="flex-wrapper flex-add tr">
          <span>{{item.payRate || 0}}%</span>
          <span>￥{{item.poundage || 0}}</span>
        </div>
      </span>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
export default {
  props: ["dataList"],
  data() {
    return {
      activeNames: []
    };
  },
  watch: {},
  filters: {
    status: val => {
      let status;
      switch (val) {
        case 0:
          status = "提现中";
          break;
        case 1:
          status = "提现成功";
          break;
        default:
          break;
      }
      return status;
    }
  },
  created() {},
  methods: {},
  computed: {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.flx {
  display: flex;
}
.flex-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.flex-add {
  position: relative;
  align-items: flex-end;
  float: right;
}
.or {
  right: 10px;
}
.tr {
  right: 25px;
}
</style>
