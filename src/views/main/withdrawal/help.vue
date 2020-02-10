 <template>
  <div class="withdrawalhelp">
    <div class="text-item">
      <p class="title">1、 什么是账户金额？</p>
      <p class="text">即商户通过关联的订单可以获得的分润金额（已扣除支付通道费率产生的费用），提现后将扣除已经提现的金额。</p>
      <p class="text">注:若订单发生了退款行为，则该笔订单产生的分成也将会被退回。</p>
    </div>
    <div class="text-item">
      <p class="title">2、 什么是可提现金额？</p>
      <p
        class="text"
      >即商户可以提现至绑定的银行账户中的金额（已扣除支付通道费率产生的费用），因资金通过第三方支付通道（微信、支付宝等）需T1到账，将会有部分订单的分成因未到账而不能提现，因此余额中会有暂时不能提现的金额；提现后将扣除已经提现的金额。</p>
    </div>
    <div class="text-item">
      <p class="title">3、 什么是累计分成金额？</p>
      <p class="text">即商户通过历史关联的订单获得的分润金额（已扣除支付通道费率产生的费用）。</p>
      <p class="text">注:若订单发生了退款行为，则该笔订单产生的分成也将会被退回</p>
    </div>
  </div>
</template>
 
 <script>
export default {
  components: {},
  created() {
    document.title = "金额说明";
  }
};
</script>
 
 <style lang="scss" scoped>
@import "../../../static/style/mixin.scss";
.withdrawalhelp {
  background-color: #fff;
  min-height: 100%;
  padding: 20px;
  .text-item {
    margin-bottom: 20px;
    .title {
      @include colorsize(#333, 16px);
    }
    .text {
      @include colorsize(#969696, 16px);
    }
    .title,
    .text {
      line-height: 26px;
      word-wrap: break-word;
    }
  }
}
</style>
