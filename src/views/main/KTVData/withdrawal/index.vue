<template>
  <div class="withdrawalConfirm">
    <div class="content-wrapper">
      <van-cell class="withdrawalTitle" title="提现金额" />
      <van-field
        class="symbol"
        label-width="25px"
        input-align="left"
        clearable
        type="number"
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
    <van-overlay :show="showLoading">
      <div class="popwrappers">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
    <van-dialog
      v-model="createModal"
      @confirm="confirm"
      @cancel="cancel"
      title="确定提交提现申请"
      show-cancel-button
    >
      <div class="popcreate">
        <van-cell-group>
          <van-field
            class="popcreatefield"
            input-align="right"
            label="提现金额"
            :value="inputnum? Number(inputnum).toFixed(2) + '元': 0"
            readonly
          />
          <van-field
            class="popcreatefield"
            input-align="right"
            label="手续费"
            :value="`${poundange.toFixed(2)}元`"
            readonly
          />
          <van-field
            class="popcreatefield"
            input-align="right"
            label="实际到账金额"
            :value="arrivemo? Number(arrivemo).toFixed(2) + '元': 0"
            readonly
          />
        </van-cell-group>
      </div>
    </van-dialog>
    <div class="bankInfo-wrapper">
      <van-cell>
        <template slot="title">
          <div class="bankinfo">
            <span class="title">到账银行卡</span>
            <span
              v-if="financialObj"
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
    <van-cell class="item-common highLightFont" :value="arrivemo|changeMoney" size>
      <template slot="title">
        <span class="inMoney">实际到账金额</span>
        <van-icon @click="showHelp" class="actualAccountNum" name="question-o" />
      </template>
    </van-cell>
    <van-button @click="submit" class="confirm entityBtnDefault">提交申请</van-button>
  </div>
</template>
// 5w 1 7

<script>
import { withdrawalApi, withdrawalRecord } from "@/api/withdrawal";
import { mapActions } from "vuex";
import { getPersonMidInfo } from "@/api/user";
export default {
  data() {
    return {
      showLoading: false, // 加载中
      resultStatus: false, // 结果状态
      createModal: false, // 确认取消弹窗
      id: null, // 提现id
      inputnum: null, //提现金额
      num: 0 // 可提现金额
    };
  },
  computed: {
    // 手续费
    poundange() {
      let num = this.inputnum ? this.inputnum : 0;
      return parseInt(num) <= 50000 ? 1 : 7;
    },
    // 用户Id
    user_id() {
      return this.$store.state.user.user_id;
    },
    // 实际到账金额
    arrivemo() {
      if (Number(this.inputnum) - Number(this.poundange) < 0) return 0;
      if (Number(this.inputnum) > Number(this.withdrawalMoney)) return 0;
      return parseFloat(Number(this.inputnum) - Number(this.poundange)).toFixed(
        2
      );
    },
    // 可提现
    withdrawalMoney() {
      return this.$store.state.withdrawal.withdrawalValue;
    },
    financialObj() {
      return this.$store.state.withdrawal.financialObj;
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["setPersonInfo"]),
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
    // 确认
    confirm() {
      this.showLoading = true;
      withdrawalApi(Number(this.inputnum).toFixed(2) * 100, this.user_id)
        .then(res => {
          this.id = res.data.id;
          this.showLoading = false;
          this.createModal = true;
          this.setPersonInfo();
          this.$router.push({
            path: "/withdrawalResult",
            query: {
              f: true,
              bank: `${this.financialObj.bank}(${String(
                this.financialObj.cardNumber
              ).slice(-4)})`,
              withdrawalMoney: this.withdrawalMoney
            }
          });
        })
        .catch(e => {
          if (e.status === 400) {
            this.showLoading = false;
            this.$router.push({
              path: "/withdrawalResult",
              params: {
                f: false,
                e: e.data.ping
              }
            });
          }
        });
      // withdrawalRecord(this.id, "pending").then(res => {
      //   this.createModal = false;
      //   this.setPersonInfo();
      //   if (res.status === "pending") {
      //     this.$router.push({
      //       path: "/withdrawalResult",
      //       query: {
      //         f: true,
      //         bank: `${this.financialObj.bank}(${String(
      //           this.financialObj.cardNumber
      //         ).slice(-4)})`,
      //         withdrawalMoney: this.withdrawalMoney
      //       }
      //     });
      //     return;
      //   }

      //   this.$router.push({
      //     path: "/withdrawalResult",
      //     params: {
      //       f: false
      //     }
      //   });
      // });
    },
    // 取消
    cancel() {
      // withdrawalRecord(this.id, "canceled").then(res => {
      this.createModal = false;
      //   if (res.status === "canceled") {
      //     this.$toast("已取消");
      //     return;
      //   }
      // });
    },
    //说明
    showHelp() {
      this.$dialog.alert({
        message:
          "实际到账金额 = 可提现金额 - 可提现金额 * 支付通道费率 - 提现手续费",
        confirmButtonText: "知道了"
      });
    },
    // 提交
    submit() {
      this.createModal = true;
      if (this.inputnum <= 1) {
        this.$toast.fail({
          duration: 2500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "提现金额应大于1元"
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/style/base.scss";
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
.popcreate {
  padding: 10px 30px;
}
.popcreate [class*="van-hairline"]::after {
  border: none !important;
}
.popcreate .van-cell:not(:last-child)::after {
  border: none !important;
}
.popcreate .popcreatefield .van-field__body input {
  color: #d7717b !important;
}
.popwrappers {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>