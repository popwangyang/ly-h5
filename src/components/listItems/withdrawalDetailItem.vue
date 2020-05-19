<template>
  <van-collapse v-model="activeNames">
    <van-collapse-item v-for="(item, index) in dataList" :key="index">
      <span class="flx" slot="title">
        <div class="flex-wrapper">
          <span
            v-if="item.status_display === '创建提现申请'"
            style="color: #353535;"
          >{{item.status_display}}</span>
          <span v-if="item.status_display === '处理中'" style="color: #FFB04E;">{{item.status_display}}</span>
          <span
            v-if="item.status_display === '提现成功'"
            style="color: #01CCA3;"
          >{{item.status_display}}</span>
          <span
            v-if="item.status_display === '提现失败'"
            style="color: #EE2B30;"
          >{{item.status_display}}</span>
          <span
            v-if="item.status_display === '取消提现'"
            style="color: #888888;"
          >{{item.status_display}}</span>
          <span class="create-time">{{item.create_time}}</span>
        </div>
        <div class="flex-wrapper flex-add or">
          <span>￥{{item.amount_display|toFixed2}}</span>
          <span>
            <span class="real_amount">实际到账：</span>
            <span style="color: #E97557;">￥{{item.real_amount_display|toFixed2}}</span>
          </span>
        </div>
      </span>
      <span class="flx bggrey">
        <div class="flex-wrapper">
          <span>提现手续费</span>
        </div>
        <div class="flex-wrapper flex-add tr">
          <span class="color444">￥{{item.user_fee_display|toFixed2}}</span>
        </div>
      </span>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
import { getPayment_channel_rate } from "@/api/withdrawal.js";
export default {
  props: ["dataList"],
  data() {
    return {
      payrate: "",
      activeNames: []
    };
  },
  watch: {},
  filters: {
    // 实际到账
    real_amount_display: val => {
      let user_fee_display = parseInt(val.real_amount_display) <= 50000 ? 1 : 7;
      return val.real_amount_display - user_fee_display;
    },
    // 手续费
    user_fee_display: val => {
      return parseInt(val.real_amount_display) <= 50000 ? 1 : 7;
    },
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
  methods: {
    // 通道费率
    getPayment_channel_rateApi() {
      getPayment_channel_rate().then(res => {
        if (Array.isArray(res.data.results) && res.data.results.length) {
          this.payrate = res.data.results[0].payment_channel_rate;
        }
      });
    }
  },
  mounted() {
    this.getPayment_channel_rateApi();
  }
};
</script>
<style scoped>
.create-time {
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 23px;
}
.color444 {
  color: #444444;
}
.real_amount {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
.bggrey {
  background-color: #f7f6f9;
  padding: 18px 9px;
}
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
