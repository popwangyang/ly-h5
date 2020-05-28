<template>
  <div class="expensesDetailsBox">
    <div class="header">综合服务费</div>
    <div class="content">
      <van-grid :column-num="2" style="border-left: 0.5px solid #ebedf0;">
        <van-grid-item class="title">项目</van-grid-item>
        <van-grid-item class="title">费用（元/年）</van-grid-item>

        <van-grid-item class="tableItem">曲库内容管理、CDN内容推送、风险内容预警等服务</van-grid-item>
        <van-grid-item>{{data.music_library_cdn_risk_warning_service}}</van-grid-item>

        <van-grid-item class="tableItem">扫码付费/精确计次实现服务费</van-grid-item>
        <van-grid-item>{{data.scan_code_payment_accurate_counting}}</van-grid-item>

        <van-grid-item class="tableItem">机顶盒采购/升级成本</van-grid-item>
        <van-grid-item>{{data.set_top_box_purchase_upgrade_cost}}</van-grid-item>

        <van-grid-item v-show="!isPerson" class="tableItem">交换机(数字通讯设备)采购/升级成本</van-grid-item>
        <van-grid-item v-show="!isPerson">{{data.switch_purchase_upgrade_cost}}</van-grid-item>

        <van-grid-item class="tableItem">其他综合技术维护费</van-grid-item>
        <van-grid-item>{{data.other_comprehensive_service_payment}}</van-grid-item>

        <van-grid-item class="tableItem bolder">综合技术维护费合计</van-grid-item>
        <van-grid-item class="bolder">{{data.total_comprehensive_service_payment}}</van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    // 个人中心入口合同
    isPerson: {
      type: Boolean,
      required: false
    }
  }
};
</script>
<style>
.expensesDetailsBox .content .title .van-grid-item__content {
  padding: 0 !important;
  height: 46px;
  background: #f6f8f9;
}
</style>
<style scoped="scoped" lang="less">
.expensesDetailsBox {
  .header {
    display: block;
    margin: 8px 16px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .content {
    background: white;
    padding: 20px 10px 20px;
    .title {
      color: #000000;
      font-weight: bold;
    }
    .tableItem {
      text-align: center;
    }
    .bolder {
      font-weight: bolder;
    }
  }
}
</style>
