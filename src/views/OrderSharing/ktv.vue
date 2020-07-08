<template>
  <div class="orderktvDetail">
    <ContentLoad class="orderktv-wrapper" :getInfo="getData">
      <div class="orderDetailTop">
        <img :src="orderDetailTop" alt width="17" height="17" />
        <span>{{ res.status_display }}</span>
      </div>
      <van-cell-group class="group1" key="group1">
        <span class="circle c1"></span>
        <span class="circle c2"></span>
        <van-cell
          title="综合服务费"
          :value="`￥${toFixed2(res.music_amount_display)}`"
        />
        <van-cell
          title="开房套餐费用"
          :value="`￥${toFixed2(res.package_amount_display)}`"
        />
        <van-cell
          title="扫码订单金额"
          :value="`￥${toFixed2(res.amount_display)}`"
        />
        <van-cell
          class="van-value-weight"
          title="实付金额"
          :value="`￥${toFixed2(res.real_amount_display)}`"
        />
        <van-cell title="订单编号" :value="res.platform_id" />
        <div>
          <van-cell title="支付方式">
            <template slot="right-icon">
              <div class="payiconstyle">
                <!-- <img :src="showPng" width="16" height="16" /> -->
                <span>{{ res.platform_display }}</span>
              </div>
            </template>
          </van-cell>
        </div>
        <van-cell title="交易时间" :value="res.pay_time" />
      </van-cell-group>
      <p class="active">
        费用分成（支付通道费率{{ res.payment_channel_rate_display }}）
      </p>
      <van-cell-group v-if="res.royalty_set" class="group2">
        <van-cell
          title="场所分成"
          :value="`￥${toFixed2(res.royalty_set.place_base_royalty_amount)}`"
        />
        <van-cell
          title="开房套餐分成"
          :value="`￥${toFixed2(res.royalty_set.place_package_royalty_amount)}`"
        />
        <van-cell
          class="van-value-weight"
          title="分成总金额"
          :value="`￥${toFixed2(res.royalty_set.place_royalty_amount)}`"
        />
      </van-cell-group>

      <p v-if="res.package" class="active">购买套餐</p>
      <van-cell-group class="group2">
        <div>
          <van-cell
            v-if="res.package"
            title="套餐名称"
            :value="`${res.package.name}`"
          >
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

      <div>
        <p class="active">{{ operation_name ? "参与活动" : "暂未参与活动" }}</p>
        <van-cell-group v-if="operation_name">
          <van-cell
            class="activeName"
            title="活动名称"
            :value="`#${operation_name}#`"
          >
            <template slot="label">
              <ul
                v-show="gift_cards.length"
                v-for="(item, index) in gift_cards"
                :key="`gift${index}`"
                class="active-wrapper"
              >
                <li>
                  <span>{{ item.card_name }}</span>
                  <span v-if="item.status === 1">{{ "未核销" }}</span>
                  <span v-if="item.status === 2">{{ "已核销" }}</span>
                  <span v-if="item.status === 3">{{ "已作废" }}</span>
                </li>
                <li>
                  <span>{{
                    item.card_number ? `${item.card_number}元` : "免费"
                  }}</span>
                  <span>{{ item.code }}</span>
                </li>
              </ul>
              <p v-show="gift_cards.length === 0 || !gift_cards.length">
                未领取优惠券
              </p>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <van-dialog
        v-if="res.package"
        v-model="showPackage"
        :title="res.package.name"
      >
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
                  <span class="good-item-font">{{ item.name }}</span>
                  <span class="good-item-font" style="margin-left: 10px;"
                    >* {{ item.count }}</span
                  >
                </div>
                <span style="font-weight:bold;" class="good-item-font">{{
                  `￥${toFixed2(item.original_price)}`
                }}</span>
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

<style lang="less" scoped>
.orderktvDetail {
  width: 345px;
  height: 100%;
  padding-top: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .orderDetailTop {
    height: 52px;
    background: rgba(1, 204, 163, 1);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
    }
  }
  .orderktv-wrapper {
    flex: 1;
  }
  .group1 {
    position: relative;
    .circle {
      position: absolute;
      width: 15px;
      height: 15px;
      background-color: #f6f6f6;
      border-radius: 50%;
      z-index: 11;
    }
    .c1 {
      top: 5px;
      left: -7.5px;
    }
    .c2 {
      top: 5px;
      right: -7.5px;
    }
  }
  .active {
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
.orderktvDetail .active-wrapper li {
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
