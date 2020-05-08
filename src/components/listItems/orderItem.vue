<template>
  <div>
    <div v-if="isMana" class="orderItem-employee" value="营业中" @click="btnClick">
      <div class="orderItem-employee-a">
        <span class="orderItem-e-t">{{data.platform_id}}</span>
        <span class="orderItem-e-r">{{data.status_display}}</span>
      </div>
      <div class="orderItem-employee-b">
        <div class="op op1">
          <div class="op-img-date">
            <img class="img" :src="showPng" alt width="28" height="28" />
            <span class="right-date">￥{{data.real_amount_display|toFixed2}}</span>
          </div>
          <span class="right-time">{{data.pay_time}}</span>
        </div>
        <div class="op op2">
          <span class="title-text1">{{data.ktv_name}}</span>
          <span class="title-text2">{{data.area_display}}</span>
        </div>
      </div>
    </div>
    <van-cell v-else class="orderItem-wrapper" value="营业中" @click="btnClick">
      <div :class="['wrapper',hasPay?'wrapperLeft':'']" slot="title">
        <span class="title">{{data.platform_id}}</span>
        <span style="margin-top:5px;" v-if="!isKtv" class="title-text">{{data.ktv_name}}</span>
        <span v-else class="right-date">{{data.pay_time}}</span>
        <img v-if="hasPay" class="img" :src="showPng" alt width="28" height="28" />
      </div>
      <div class="wrapper">
        <span class="right-title">{{data.status_display}}</span>
        <span v-if="!isKtv" class="right-date">{{data.pay_time}}</span>
        <span v-else class="right-date">分成：￥{{data.share_amount|toFixed2}}</span>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    hasPay: {
      type: Boolean
    },
    isMana: {
      type: Boolean,
      default: false
    },

    isKtv: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgIcon: require("../../assets/pay.png"),
      wxIcon: require("../../assets/wx.png"),
      zfbIcon: require("../../assets/zfb.png")
    };
  },
  computed: {
    // 用户类型
    userType() {
      return this.$store.state.user.usertype;
    },
    showPng() {
      let result = null;
      switch (this.data.platform_display) {
        case "微信":
          result = this.wxIcon;
          break;
        case "支付宝":
          result = this.zfbIcon;
          break;
        default:
          result = this.imgIcon;
          break;
      }
      return result;
    }
  },
  methods: {
    btnClick() {
      if (
        this.userType === "copyright_party" ||
        this.userType === "platform" ||
        this.userType === "agentibus"
      ) {
        this.$router.push({
          name: "orderSharingDetail",
          query: {
            pk: this.data.id,
            share_amount: this.data.share_amount,
            isPlatform: this.userType === "employee" ? 1 : 0
          }
        });
        return;
      }

      //平台管理
      if (this.userType === "employee") {
        this.$router.push({
          name: "ordeManaDetail",
          query: {
            pk: this.data.id,
            share_amount: this.data.share_amount,
            isPlatform: this.userType === "employee" ? 1 : 0
          }
        });
        return;
      }

      // 代垫方
      if (this.userType === "advance_party") {
        this.$router.push({
          name: "orderSharingIconDetail",
          query: {
            type: this.userType,
            pk: this.data.id,
            share_amount: this.data.share_amount,
            payment_channel_rate_display: this.data.payment_channel_rate_display
          }
        });
        return;
      }
      // ktv管理方
      if (this.userType === "ktv") {
        this.$router.push({
          name: "orderKTVDetail",
          query: {
            type: this.userType,
            pk: this.data.id,
            share_amount: this.data.share_amount,
            payment_channel_rate_display: this.data.payment_channel_rate_display
          }
        });
        return;
      }
    }
  }
};
</script>
<style>
.orderItem-wrapper .wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
.orderItem-wrapper .wrapperLeft {
  padding-left: 40px;
}
.orderItem-wrapper .wrapper span {
  flex: 1;
}
.orderItem-wrapper .wrapper .img {
  position: absolute;
  top: 5px;
  left: 0;
}
.orderItem-employee {
  margin: 6px 0 11px 0;
  background-color: #fff;
}
.orderItem-employee .van-cell {
  padding: 0;
}
.orderItem-employee .orderItem-employee-a {
  border-bottom: 1px solid #f6f6f6;
  position: relative;
  display: flex;
  justify-content: space-around;
  padding: 5px 15px;
}
.orderItem-employee-b .op {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orderItem-employee-b .op1 {
  padding: 10px 15px;
}
.orderItem-employee-b .op2 {
  padding: 0 15px 10px 15px;
}
.orderItem-employee-b .op2 .title-text1 {
  height: 14px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 14px;
}
.orderItem-employee-b .op2 .title-text2 {
  height: 14px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 14px;
}
.orderItem-employee-b .op .img,
.orderItem-employee-b .op .right-date {
  vertical-align: middle;
}
.orderItem-employee-b .op .right-time {
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.orderItem-employee-b .op .right-date {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(68, 68, 68, 1);
  margin-left: 10px;
}
.orderItem-employee .orderItem-employee-a .orderItem-e-t,
.orderItem-employee .orderItem-employee-a .orderItem-e-r {
  flex: 1;
}
.orderItem-employee .orderItem-employee-a .orderItem-e-t {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  height: 20px;
  line-height: 20px;
}
.orderItem-employee .orderItem-employee-a .orderItem-e-r {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
  text-align: right;
}

.orderItem-wrapper .wrapper .title {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  line-height: 20px;
  margin-bottom: 5px;
}

.orderItem-wrapper .wrapper .title-text {
  height: 12px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 10px;
}
.orderItem-wrapper .wrapper .right-title {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
  margin-bottom: 8px;
}
.orderItem-wrapper .wrapper .right-date {
  height: 14px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 14px;
}
.mt5 {
  margin-top: 5px;
}
.mt9 {
  margin-top: 9px;
}
</style>
