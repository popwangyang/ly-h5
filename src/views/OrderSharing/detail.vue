<template>
  <div class="orderDetail">
    <ContentLoad :getInfo="getData">
      <van-cell-group key="group1">
        <van-cell title="订单编号" :value="res.platform_id" />
        <van-cell title="场所名称" :value="res.ktv_name" />
        <van-cell title-class="detailaArea" title="地区" :value="res.area_display" />
        <van-cell v-if="isPlatform" title="扫码订单金额" :value="`￥${toFixed2(res.amount_display)}`" />
        <van-cell v-if="!isPlatform" title="曲库扫码金额" :value="`￥${toFixed2(res.amount_display)}`" />
        <van-cell title="曲库服务费" :value="`￥${toFixed2(res.song_service_fee_display)}`" />
        <van-cell title="综合技术服务费" :value="`￥${toFixed2(res.technology_service_fee_display)}`" />
        <van-cell title="支付通道费率" :value="`${res.payment_channel_rate_display|| 0}`" />
      </van-cell-group>
      <van-cell-group key="group2">
        <van-cell title="实付金额" :value="`￥${toFixed2(res.real_amount_display)}`" />
        <van-cell title="分成金额" :value="`￥${toFixed2(share_amount)}`" />
      </van-cell-group>
      <van-cell title="交易时间" :value="`${res.pay_time}`" />
    </ContentLoad>
  </div>
</template>

<script>
import { orderItem } from "@/api/order";
import ContentLoad from "@/components/contentLoad";

export default {
  data() {
    return {
      res: {} // 详情数据
    };
  },
  components: {
    ContentLoad
  },
  computed: {
    // ID
    id() {
      return this.$route.query.pk;
    },

    // 分成金额
    share_amount() {
      return this.$route.query.share_amount;
    },

    // 是否为平台用户
    isPlatform() {
      return this.$route.query.isPlatform;
    }
  },
  methods: {
    // 金额处理
    toFixed2(val) {
      if (val) return Number(val).toFixed(2);
      return 0;
    },

    //获取数据
    getData() {
      return new Promise((resolve, reject) => {
        orderItem(this.id)
          .then(r => {
            if (r.data) {
              this.res = r.data;
            }
            resolve(r);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.orderDetail {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  overflow: auto;
}
</style>
<style>
.orderDetail .van-cell-group {
  margin-bottom: 15px;
}
.detailaArea {
  width: 50px;
  flex: inherit !important;
}
</style>