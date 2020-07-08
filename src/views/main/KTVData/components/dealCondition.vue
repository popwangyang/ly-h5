<template>
  <div class="dealCondition">
    <p class="title">平台交易情况</p>
    <div class="order-wrapper">
      <div class="left">
        <p class="left-title">订单总数</p>
        <p class="left-num">{{ resData.orderTotal }}</p>
      </div>
      <div class="right">
        <p class="right-p">
          <span class="green circle"></span>
          <span class="right-title">已完成订单</span>
          <span class="right-num">{{ resData.finishOrder }}</span>
        </p>
        <p class="right-p right-p1">
          <span class="grey circle"></span>
          <span class="right-title">退款订单</span>
          <span class="right-num">{{ resData.backOrder }}</span>
        </p>
      </div>
    </div>
    <div class="order-wrapper">
      <div class="left">
        <p class="left-title">交易金额</p>
        <p class="left-num">
          <span class="f12 fnormal">￥</span>
          {{ resData.dealNum | toFixed2 }}
        </p>
      </div>
      <div class="right">
        <p class="right-p">
          <span class="blue circle"></span>
          <span class="right-title">到账金额</span>
          <span class="right-num">
            <span class="f8 fnormal">￥</span>
            {{ resData.inNum | toFixed2 }}
          </span>
        </p>
        <p class="right-p right-p1">
          <span class="grey circle"></span>
          <span class="right-title">退款金额</span>
          <span class="right-num">
            <span class="f8 fnormal">￥</span>
            {{ resData.backNum | toFixed2 }}
          </span>
        </p>
      </div>
    </div>
    <div class="card-wrapper">
      <num-card
        v-if="isUserShow"
        :num="resData.totalUser"
        label="用户总数"
        :icon="icontotal"
        style="background: linear-gradient(134deg,rgba(255,128,128, 1) 0%,rgba(247,155,155, 1) 100%)"
      ></num-card>
      <num-card
        :num="resData.cityNum"
        label="城市开通数"
        :icon="iconcity"
        style="background: linear-gradient(314deg,rgba(13,226,218,1) 0%,rgba(61,174,226,1) 100%)"
      ></num-card>
    </div>
    <div class="card-wrapper">
      <num-card
        :num="resData.ktvNum"
        label="KTV接入总数"
        :icon="iconktv"
        style="background: linear-gradient(314deg,rgba(193,147,237,1) 0%,rgba(142,131,219,1) 100%)"
      ></num-card>
      <num-card
        :num="resData.itermNum"
        label="终端数"
        :icon="iconiterm"
        style="background: linear-gradient(314deg,rgba(255,206,113,1) 0%,rgba(255,164,89,1) 100%)"
      ></num-card>
    </div>
  </div>
</template>

<script>
import numCard from "@/components/numCard/index";
export default {
  components: {
    numCard
  },
  props: {
    resData: {
      type: Object
    },
    isUserShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icontotal: require("@/assets/user.png"),
      iconcity: require("@/assets/city.png"),
      iconktv: require("@/assets/ktvnum.png"),
      iconiterm: require("@/assets/iterm.png")
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../../../static/style/base.less";
.dealCondition {
  padding: 16px 15px;
  background-color: #fff;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(68, 68, 68, 1);
    line-height: 22px;
    padding-bottom: 5px;
    border-bottom: 1px solid #f6f6f6;
  }
  .order-wrapper {
    margin-top: 12px;
    display: flex;
    align-items: center;
    width: 345px;
    height: 82px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 2px rgba(221, 221, 221, 0.31);
    border-radius: 4px;
    padding: 17px 13px;
    justify-content: space-around;
    .left {
      width: 126px;
      border-right: 1px solid #f6f6f6;
      .left-title {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(108, 114, 124, 1);
        line-height: 17px;
      }
      .left-num {
        margin-top: 6px;
        height: 27px;
        font-size: 20px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(68, 68, 68, 1);
        line-height: 24px;
      }
    }
    .right {
      flex: 1;
      margin-left: 20px;
      height: 100%;
      .right-p {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
        }
        span.circle {
          margin-right: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .green {
          background-color: #01cca3;
        }
        .grey {
          background-color: #ececec;
        }
        .blue {
          background-color: #0082ff;
        }
        span.right-title {
          width: 72px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
        span.right-num {
          font-size: 16px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(68, 68, 68, 1);
          line-height: 19px;
        }
      }
      .right-p1 {
        margin-top: 8px;
      }
    }
  }
  .card-wrapper {
    display: flex;
    justify-content: space-between;
    .card {
      width: 162px;
      height: 76px;
      margin: 20.5px 0;
      box-shadow: 0px 4px 10px 0px rgba(159, 159, 159, 0.33);
      border-radius: 8px;
    }
    .card1 {
      background: linear-gradient(
        134deg,
        rgba(255, 128, 128, 1) 0%,
        rgba(247, 155, 155, 1) 100%
      );
    }
    .card2 {
      background: linear-gradient(
        314deg,
        rgba(193, 147, 237, 1) 0%,
        rgba(142, 131, 219, 1) 100%
      );
    }
    .card3 {
      background: linear-gradient(
        314deg,
        rgba(13, 226, 218, 1) 0%,
        rgba(61, 174, 226, 1) 100%
      );
    }
    .card4 {
      background: linear-gradient(
        314deg,
        rgba(255, 206, 113, 1) 0%,
        rgba(255, 164, 89, 1) 100%
      );
    }
  }
}
</style>
