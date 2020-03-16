<template>
  <div class="withdrawalConfirm">
    <div class="content-wrapper">
      <van-cell class="withdrawalTitle" title="提现金额" />
      <van-field
        class="symbol"
        label-width="25px"
        input-align="left"
        clearable
        type="digit"
        v-model="inputnum"
        @input="inputchange"
        label="￥"
        placeholder="请输入提现金额"
      />
      <van-cell class="canWithdrawal-wrapper">
        <template slot="title">
          <div class="canWithdrawal">
            <span>可提现</span>
            <span>￥{{withdrawalMoney|toFixed2}}，</span>
            <span class="popupBoxConfirm" @click="withdrawal(num)">全部提现</span>
          </div>
        </template>
      </van-cell>
    </div>

    <div class="bankInfo-wrapper">
      <van-cell>
        <template slot="title">
          <div class="bankinfo">
            <span class="title">到账银行卡</span>
            <span
              class="bankName"
            >{{financialObj.bank}}({{String(financialObj.cardNumber).slice(-4)}})</span>
            <span class="content">具体到账时间以银行为主</span>
          </div>
        </template>
        <template>
          <span class="bankUserName">{{financialObj.name|desensitization}}</span>
        </template>
      </van-cell>
    </div>
    <van-cell class="item-common" title="提现手续费" :value="poundange|toFixed2|changeMoney" />
    <van-cell class="item-common highLightFont" :value="withdrawalMoney|changeMoney" size>
      <template slot="title">
        <span class="inMoney">实际到账金额</span>
        <van-icon @click="showHelp" class="actualAccountNum" name="question-o" />
      </template>
    </van-cell>
    <van-button @click="submit" class="confirm entityBtnDefault">提交申请</van-button>
  </div>
</template>

<script>
import { withdrawalApi } from "@/api/withdrawal";
export default {
  data() {
    return {
      inputnum: null, //提现金额
      num: 0, // 可提现金额
      poundange: 0 // 手续费
    };
  },
  computed: {
    // 用户Id
    user_id() {
      return this.$store.state.user.user_id;
    },
    // 可提现
    withdrawalMoney() {
      return this.$store.state.user.withdrawalValue;
    },
    financialObj() {
      return this.$store.state.user.financialObj;
    }
  },
  mounted() {
    console.log(this.financialObj);
  },
  methods: {
    // 输入变化
    inputchange(val) {
      if (val > this.withdrawalMoney) {
        this.$toast.fail({
          duration: 2500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "提现金额超限"
        });
        return true;
      }
    },
    // 全部提现
    withdrawal() {
      this.inputnum = this.withdrawalMoney;
    },
    showHelp() {
      this.$dialog.alert({
        message:
          "实际到账金额 = 可提现金额 - 可提现金额 * 支付通道费率 - 提现手续费",
        confirmButtonText: "知道了"
      });
    },

    submit() {
      if (!this.inputnum) {
        this.$toast.fail({
          duration: 2500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "提现金额不能为0"
        });
        return;
      }
      if (this.inputnum > this.withdrawalMoney) {
        this.$toast.fail({
          duration: 2500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "提现金额超限"
        });
        return;
      }
      withdrawalApi(Number(this.inputnum) * 100, this.user_id).then(res => {
        console.log("创建结果");
        console.log(res);
        // this.createModal = true;
        // console.log(res);
        // this.id = res.id;
      });
      // this.$router.push({ path: "/withdrawalResult" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/style/base.scss";
.withdrawalConfirm {
  min-height: 100%;
  background: rgba(246, 246, 246, 1);
  width: 100%;
  .content-wrapper {
    background-color: #fff;
    .canWithdrawal {
      color: #999;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 17px;
    }
  }
  .bankInfo-wrapper {
    margin: 10px 0;
    .bankUserName {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
    .bankinfo {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(108, 114, 124, 1);
        line-height: 17px;
        margin-bottom: 8px;
      }
      .bankName {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(68, 68, 68, 1);
        line-height: 20px;
        margin-bottom: 2px;
      }
      .content {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;
      }
    }
  }
  .confirm {
    margin: 20px auto 0 auto;
    display: block;
    width: 90%;
  }
}
::v-deep .van-cell {
  padding-left: 15px;
  padding-right: 15px;
}
::v-deep .withdrawalTitle {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(68, 68, 68, 1);
  line-height: 22px;
  &::after {
    border-bottom: none;
  }
}
::v-deep .symbol {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 23px 0px rgba(221, 221, 221, 0.6);
  border-radius: 2px;
  width: 345px;
  height: 48px;
  margin: 0 auto 15px auto;
  after {
    border-bottom: none;
  }
}
</style>
<style>
.withdrawalConfirm .symbol .van-field__label {
  font-size: 18px;
}
.withdrawalConfirm .actualAccountNum {
  top: 2px;
  margin-left: 5px;
}
.withdrawalConfirm .black {
  color: black !important;
}
.withdrawalConfirm .canWithdrawal-wrapper {
  padding-top: 0;
}
.withdrawalConfirm .bankInfo {
  margin-top: 10px;
}
.withdrawalConfirm .bankInfo-wrapper .van-cell {
  align-items: center;
}
.withdrawalConfirm .item-common,
.withdrawalConfirm .item-common .inMoney {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  line-height: 20px;
}
.withdrawalConfirm .highLightFont span {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 91, 63, 1);
  line-height: 20px;
}
.withdrawalConfirm .confirm {
  height: 48px;
  border-radius: 4px;
}
</style>