<template>
  <div class="withdrawal-result">
    <div class="result">
      <van-icon v-if="f" size="52px" color="#01CCA3" name="checked" />
      <van-icon v-else size="52px" color="#F56C6C" name="clear" />
      <div v-if="f">
        <p class="title">提现申请已成功提交</p>
        <p class="content">具体到账时间以银行为准</p>
      </div>
      <p v-else class="content">请稍后再试</p>
    </div>
    <div v-if="f" class="content">
      <van-cell-group>
        <van-cell title="提现银行卡" :value="bank" />
        <van-cell title="提现金额" :value="inputnum|toFixed2|changeMoney" />
        <van-cell title="手续费" :value="poundange|toFixed2|changeMoney" />
        <van-cell class="inMoney" title="实际到账金额" :value="inputnum|toFixed2|changeMoney" />
      </van-cell-group>
    </div>
    <van-button @click="submit" class="confirm entityBtnDefault">完成</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank: "", //银行
      inputnum: 0, //提现金额
      poundange: 0, // 手续费
      f: false // 提现结果
    };
  },
  mounted() {
    this.f = this.$route.query.f;
    this.bank = this.$route.query.bank;
    this.inputnum = this.$route.query.withdrawalMoney;
  },
  methods: {
    submit() {
      if (this.f) {
        this.$router.push({ path: "/main" });
        return;
      }
      this.$router.push({ path: "/withdrawal" });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../../../static/style/mixin.scss";
.withdrawal-result {
  .result {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    height: 181px;
    .icon {
      width: 200px;
    }
    .title {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 28px;
      margin-top: 7px;
      @include colorsize(#212121, 20px);
    }
    .content {
      text-align: center;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 17px;
      @include colorsize(#666666, 12px);
    }
  }
  .content {
    margin-top: 10px;
  }
  .confirm {
    margin: 20px auto 0 auto;
    display: block;
    width: 90%;
  }
}
</style>
<style>
.withdrawal-result .van-cell__value {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
.withdrawal-result .inMoney .van-cell__value {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 91, 63, 1);
  line-height: 20px;
}
.withdrawal-result .van-cell__title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #444;
  line-height: 20px;
}
.withdrawal-result .confirm {
  height: 48px;
  border-radius: 4px;
}
</style>