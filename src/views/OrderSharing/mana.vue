<template>
  <div class="orderManaDetail">
    <ContentLoad class="orderktv-wrapper" :getInfo="getData">
      <van-cell-group class="group1">
        <van-cell title="订单编号" :value="res.platform_id" />
        <van-cell title="订单状态" :value="res.status_display" />
        <van-cell title="渠道订单号" :value="res.ping_id" />
        <van-cell title="渠道来源" :value="res.source_display" />
      </van-cell-group>
      <van-cell-group class="group1">
        <span class="circle c2"></span>
        <van-cell title="音乐服务费" :value="`￥${toFixed2(res.music_amount_display)}`" />
        <van-cell title="开房套餐费用" :value="`￥${toFixed2(res.package_amount_display)}`" />
        <van-cell title="扫码订单金额" :value="`￥${toFixed2(res.amount_display)}`" />
        <van-cell
          class="van-value-weight"
          title="实付金额"
          :value="`￥${toFixed2(res.real_amount_display)}`"
        />
        <div>
          <van-cell title="支付方式">
            <template slot="right-icon">
              <div class="payiconstyle">
                <!-- <img :src="showPng" width="16" height="16" /> -->
                <span>{{res.platform_display}}</span>
              </div>
            </template>
          </van-cell>
        </div>
        <van-cell title="交易时间" :value="res.pay_time" />
      </van-cell-group>

      <p class="active">购买套餐</p>
      <van-cell-group class="group2">
        <div>
          <van-cell v-if="res.package" title="套餐名称" :value="`${res.package.name}`">
            <template #right-icon>
              <van-icon
                @click="showPackage = true"
                name="info-o"
                style="margin-left:10px;line-height: inherit;"
              ></van-icon>
            </template>
          </van-cell>
        </div>
      </van-cell-group>
      <p class="active">音乐服务费分成（支付通道费率{{res.payment_channel_rate_display}}）</p>
      <van-cell-group v-if="res.royalty_set" class="group2">
        <van-cell title="场所" :value="`￥${toFixed2(res.royalty_set.place_base_royalty_amount)}`" />
        <van-cell title="平台" :value="`￥${toFixed2(res.royalty_set.platform_royalty_amount)}`" />
        <van-cell title="代理商" :value="`￥${toFixed2(res.royalty_set.agent_royalty_amount)}`" />
        <van-cell title="代垫方" :value="`￥${toFixed2(res.royalty_set.advance_royalty_amount)}`" />
      </van-cell-group>
      <p class="active">商户开房套餐分成（支付通道费率{{res.payment_channel_rate_display}}）</p>
      <van-cell-group v-if="res.royalty_set" class="group2">
        <van-cell title="分成费用" :value="`￥${toFixed2(res.share_amount)}`" />
      </van-cell-group>

      <p class="active">场所信息</p>
      <van-cell-group class="group2">
        <van-cell title="场所信息" :value="res.ktv_name" />
        <van-cell title="地区" :value="res.area_display" />
        <van-cell title="包房信息" :value="res.room_info" />
        <van-cell title="VOD信息" :value="res.vod_brand_name" />
      </van-cell-group>

      <p class="active">付款人信息</p>
      <van-cell-group class="group2">
        <van-cell title="付款人ID" :value="res.create" />
        <van-cell title="付款人名称" :value="res.creater" />
      </van-cell-group>

      <div>
        <p class="active">{{operation_name?'参与活动':'暂未参与活动'}}</p>
        <van-cell-group v-if="operation_name">
          <van-cell class="activeName" title="活动名称" :value="`#${operation_name}#`">
            <template slot="label">
              <ul
                v-show="gift_cards.length"
                v-for="(item, index) in  gift_cards"
                :key="`gift${index}`"
                class="active-wrapper"
              >
                <li>
                  <span>{{item.card_name }}</span>
                  <span v-if="item.status===1">{{'未核销'}}</span>
                  <span v-if="item.status===2">{{'已核销'}}</span>
                  <span v-if="item.status===3">{{'已作废'}}</span>
                </li>
                <li>
                  <span>{{item.card_number?`${item.card_number}元`:'免费'}}</span>
                  <span>{{item.code}}</span>
                </li>
              </ul>
              <p v-show="gift_cards.length===0 || !gift_cards.length">未领取优惠券</p>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <van-dialog v-if="res.package" v-model="showPackage" :title="res.package.name">
        <div class="package-wrapper">
          <p class="p-title">套餐内容</p>
          <div class="goods">
            <ul>
              <li
                v-show="res.package"
                class="good-item"
                :key="index"
                v-for="(item, index) in res.package.goods"
              >
                <div>
                  <span class="good-item-font">{{item.name}}</span>
                  <span class="good-item-font" style="margin-left: 10px;">* {{item.count}}</span>
                </div>
                <span
                  style="font-weight:bold;"
                  class="good-item-font"
                >{{`￥${toFixed2(item.original_price)}`}}</span>
              </li>
            </ul>
          </div>
        </div>
      </van-dialog>
    </ContentLoad>
  </div>
</template>

<script>
import { orderItem, orderActive } from "@/api/order";
import ContentLoad from "@/components/contentLoad";

export default {
  data() {
    return {
      showPackage: false, // 套餐详情
      operation_name: "", // 操作名称
      gift_cards: [], // 礼品卡
      orderDetailTop: require("../../assets/yestip.png"),
      res: {}, // 返回
      payicon: require("../../assets/alipay.png"),
      imgIcon: require("../../assets/pay.png"),
      wxIcon: require("../../assets/wx.png"),
      zfbIcon: require("../../assets/zfb.png")
    };
  },
  components: {
    ContentLoad
  },
  methods: {
    toFixed2(val) {
      if (val) return Number(val).toFixed(2);
      return "0.00";
    },
    // 请求列表项
    getData() {
      return new Promise((resolve, reject) => {
        orderItem(this.id)
          .then(r => {
            if (r.data) {
              this.res = r.data;
              this.getOrderActive(this.res.platform_id);
            }
            resolve(r);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取订单关联卡券活动
    getOrderActive(display_id) {
      orderActive({ display_id }).then(r => {
        if (r.data) {
          this.operation_name = r.data.operation_name;

          if (r.data.gift_cards && r.data.gift_cards.length > 0) {
            this.gift_cards = r.data.gift_cards;
          } else {
            this.gift_cards = [];
          }
        }
      });
    }
  },
  mounted() {},
  computed: {
    type() {
      return this.$route.query.type;
    },
    id() {
      return this.$route.query.pk;
    },
    share_amount() {
      return this.$route.query.share_amount;
    },
    payment_channel_rate_display() {
      return this.$route.query.payment_channel_rate_display;
    },
    showPng() {
      let result = null;
      switch (this.res.platform_display) {
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
  }
};
</script>

<style lang="scss" scoped>
.orderManaDetail {
  height: 100%;
  padding-top: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .orderktv-wrapper {
    flex: 1;
  }
  .active {
    padding-left: 15px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    margin: 5px 0;
  }
}
::v-deep .van-cell-group {
  margin-bottom: 6px;
}
::v-deep .payiconstyle {
  display: flex;
  align-items: center;
}

::v-deep .payiconstyle img {
  margin-right: 10px;
}
::v-deep .payiconstyle span {
  color: #969799;
}
::v-deep .active-wrapper {
  width: 100%;
  background: rgba(246, 248, 249, 1);
  padding: 5px 13px;
}
::v-deep .active-wrapper ul {
  width: 100%;
}
::v-deep .activeName .van-cell__value {
  position: absolute;
  right: 15px;
}
</style>
<style>
.orderManaDetail .active-wrapper li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #444;
  line-height: 17px;
  margin: 5px 0px;
}
.detailaArea {
  width: 50px;
  flex: inherit !important;
}
.van-value-weight .van-cell__value span {
  font-weight: bold !important;
  color: black;
}
.package-wrapper {
  padding: 15px;
}
.package-wrapper .p-title {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 17px;
}
.package-wrapper .goods {
  margin-top: 15px;
  height: 200px;
  border: 1px solid rgba(238, 238, 238, 1);
  line-height: 30px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  overflow-y: auto;
}
.package-wrapper .goods .good-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.good-item-font {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
</style>