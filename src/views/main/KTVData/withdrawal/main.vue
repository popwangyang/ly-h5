<template>
  <div class="withdrawalMain" ref="scroll">
    <!-- 账户余额 -->
    <div class="moneyshow changeBanner mana">
      <div class="balance">
        <p class="title">账户余额</p>
        <p class="num">￥{{ balance | toFixed2 }}</p>
      </div>
      <div class="help" @click="enterWithdrawalHelp">
        <span class="title">金额说明</span>
      </div>
      <div class="withdrawal-wrapper">
        <div class="total-wrapper">
          <div class="total firsttotal">
            <span class="title">
              <span>累计分成</span>
              <!-- <img
                @click="explainFunction"
                class="explain"
                :src="explain"
                alt
                width="10"
                height="10"
              />-->
            </span>
            <span class="num">￥{{ totalMoney | toFixed2 }}</span>
          </div>
          <div class="total">
            <span class="title">上月分成</span>
            <span class="num">￥{{ lastMonthMoney | toFixed2 }}</span>
          </div>
        </div>
        <div class="withdrawal">
          <div class="withdrawalLeft">
            <p class="title">可提现</p>
            <p class="num popupBoxConfirm">
              <span class="f18">￥</span>
              {{ withdrawalValue || 0 | toFixed2 }}
            </p>
          </div>
          <div class="button">
            <van-button class="hollowBtnDefault" @click="enterWithdrawalDetail" type="default">提现记录</van-button>
            <van-button class="rightbtn entityBtnDefault" @click="enterWithdrawal" type="default">提现</van-button>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      confirmButtonText="知道了"
      confirmButtonColor="#0082FF"
      :showConfirmButton="false"
      v-model="dialogShow"
      title="累计分成金额"
    >
      <div class="dialogDiv">
        <div class="dialogDiv-p">
          <p>即商户通过历史关联的订单获得的分润金额（已扣除支付通道费率产生的费用）。</p>
          <p>注:若订单发生了退款行为，则该笔订单产生的分成也将会被退回</p>
        </div>
        <van-button @click="dialogShow = !dialogShow" class="dialogButton popupBoxConfirm">知道了</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  orderShareTotalAmount,
  userAmount,
  monthRoyalty
} from "@/api/mainPage";
import { cacheMixins } from "@/libs/mixins";

const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth();

export default {
  name: "withdrawalMain",
  mixins: [cacheMixins],
  components: {},
  data() {
    return {
      dialogShow: false,
      explain: require("@/assets/explain.png"),
      showData: true, // 展示数据
      balance: 0, // 账户余额
      totalMoney: 0, // 累计分成
      lastMonthMoney: "0.00" // 上月分成
    };
  },
  computed: {
    // 账户状态
    financialState() {
      return this.$store.state.withdrawal.financialState;
    },
    // 允许提现
    allow_withdraw() {
      return this.$store.state.withdrawal.allow_withdraw;
    },
    // 可提现金额
    withdrawalValue() {
      return this.$store.state.withdrawal.withdrawalValue;
    },
    // 用户类型
    userType() {
      if (
        this.$store.state.user.usertype === "platform" ||
        this.$store.state.user.usertype === "agentibus" ||
        this.$store.state.user.usertype === "employee"
      ) {
        return 1; // 管理平台
      }
      return 2; // 非管理平台
    },
    user_id() {
      return this.$store.state.user.user_id;
    },
    isUserShow() {
      return (
        this.$store.state.user.usertype === "platform" ||
        this.$store.state.user.usertype === "employee"
      );
    }
  },
  methods: {
    ...mapActions(["setPersonInfo"]),
    // 初始化
    initial() {
      this.setPersonInfo();
      this.getOrderShareTotalAmount();
      this.getUserAmount();
      this.getMonthRoyalty();
    },

    //累计分成金额
    getOrderShareTotalAmount() {
      orderShareTotalAmount({
        user_id: this.user_id
      }).then(res => {
        this.totalMoney = res.share_amount;
      });
    },

    explainFunction() {
      this.dialogShow = true;
    },

    //账户余额
    getUserAmount() {
      userAmount({
        user_id: this.user_id
      }).then(res => {
        this.balance = res.amount;
      });
    },

    //月分成
    getMonthRoyalty() {
      monthRoyalty({
        date: `${this.getDate().cyear}-${this.getDate().cmonth}-01`,
        user_id: this.user_id
      }).then(res => {
        if (res.results && res.results.length === 0) {
          return (this.lastMonthMoney = "0.00");
        }
        this.lastMonthMoney = res.results[0].amount_display;
      });
    },

    getDate() {
      let cyear;
      let cmonth;
      if (month === 0) {
        cyear = year - 1;
        cmonth = "12";
      } else {
        cyear = year;
        cmonth = month;
      }
      return {
        cyear,
        cmonth
      };
    },

    // 金额说明
    enterWithdrawalHelp() {
      this.routerGo("withdrawalHelp");
    },

    // 提现记录
    enterWithdrawalDetail() {
      this.routerGo("withdrawalDetail");
    },

    // 提现确认
    enterWithdrawal() {
      if (!this.financialState) {
        this.$toast.fail({
          duration: 1500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message:
            "暂未绑定银行账户信息，请在'财务管理-平台扫码支付分成查询—账户信息'绑定。"
        });
        return;
      }
      if (!this.allow_withdraw) {
        this.$toast.fail({
          duration: 1500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "您的账户已冻结，请尽快联系商务人员处理。"
        });
        return;
      }
      this.routerGo("withdrawal");
    },

    // 路由跳转通用
    routerGo(pathname) {
      this.$router.push({
        path: `/${pathname}`
      });
    },
    // 路由跳转通用
    enterOrder() {
      this.routerGo("OrderSharing");
    }
  },

  mounted() {},
  activated() {
    this.initial();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/style/base.scss";
@import "../../../../static/style/mixin.scss";
.withdrawalMain {
  height: 100%;
  overflow-y: auto;
  .moneyshow {
    margin-bottom: 10px;
    position: relative;
    padding: 23px 0 60px 15px;
    font-size: 14px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: #fff;
    .balance {
      .title {
        margin-bottom: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 22px;
        @include colorsize(#fff, 16px);
      }
      .manatitle {
        margin-bottom: 0px !important;
      }
      .num {
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        line-height: 21px;
        font-size: 26px !important;
        @include colorsize(#fff, 18px);
      }
    }
    .help {
      position: absolute;
      top: 16px;
      right: 30px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
    .withdrawal-wrapper {
      display: flex;
      flex-direction: column;
      margin: 20px auto 0 auto;
      position: absolute;
      width: 345px;
      z-index: 15;
      .total-wrapper {
        padding: 18px 0 20px 0;
        display: flex;
        background-color: #fff;
        box-shadow: 0px 2px 10px 2px rgba(61, 191, 248, 0.11);
        border-radius: 6px;
        margin-bottom: 10px;
        .total {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(108, 114, 124, 1);
            line-height: 17px;
          }
          .num {
            margin-top: 15px;
            font-size: 20px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 91, 63, 1);
            line-height: 11px;
          }
        }
        .firsttotal {
          border-right: 1px solid #e9eef9;
          .title {
            position: relative;
            .explain {
              position: absolute;
              top: 3px;
              right: -15px;
            }
          }
        }
      }
      .withdrawal {
        width: 100%;
        display: flex;
        background: #f7f7f7;
        padding: 17px 10px;
        align-items: center;
        .withdrawalLeft {
          .title {
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 17px;
            @include colorsize(rgba(108, 114, 124, 1), 12px);
            margin-bottom: 6px;
          }
          .num {
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            line-height: 27px;
            height: 27px;
            font-size: 22px;
          }
        }
        .button {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          .rightbtn {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .mana {
    height: 287px;
  }
  .nomana {
    height: 170px;
  }
  .chart-wrapper {
    margin-top: 10px;
    padding-bottom: 30px;
    width: 100%;
    background-color: #fff;
    .tab-wrapper {
      padding-top: 13px;
      width: 100%;
      position: relative;
      overflow: hidden;
      .tab {
        width: 200px;
      }
      .tabmore {
        float: right;
        position: absolute;
        top: 25px;
        right: 20px;
        span,
        img {
          font-size: 10px;
          vertical-align: middle;
          line-height: 14px;
        }
        span {
          display: inline-block;
          margin-right: 5px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 15px;
        width: 100% !important;
        .time-title {
          padding-top: 4px;
        }
        .title-high {
          font-size: 15px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(68, 68, 68, 1);
        }
        p {
          padding-left: 10px;
          width: 100px;
          height: 21px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(108, 114, 124, 1);
        }
      }
    }
    .chartDiv {
      width: 100%;
    }
    .loading {
      text-align: center;
      padding: 40%;
      height: 350px;
    }
  }
}
.withdrawalMain .van-button--normal {
  width: 90px;
  border-radius: 16px;
  font-size: 12px;
  padding: 0;
  height: 35px;
  line-height: 35px;
  display: inline-block;
}
::v-deep .van-tabs__line {
  width: 55px !important;
  height: 6px;
  bottom: 28px;
  background: linear-gradient(
    180deg,
    rgba(0, 184, 255, 0) 0%,
    rgba(0, 130, 255, 1) 100%
  );
}
::v-deep .dataPick {
  width: 200px;
}
</style>
<style>
.withdrawalMain [class*="van-hairline"]::after {
  border: none !important;
}
.withdrawalMain .dialogDiv,
.withdrawalMain .dialogDiv-p {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.withdrawalMain .dialogDiv-p {
  padding: 20px 30px 0 30px;
}
.withdrawalMain .dialogButton {
  border-top: 1px solid #e7e7e7;
  height: 50px !important;
  line-height: 50px !important;
  font-size: 16px !important;
  width: 100% !important;
  border-radius: 0 !important;
}
.withdrawalMain .dialogDiv-p p {
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
  color: #888888;
}
</style>
