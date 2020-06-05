<template>
  <div class="orderSharing" ref="scroll">
    <div :class="['search',isOrderNum?'':'isNoOrderNum']">
      <Search v-if="isOrderNum" placeholder="请输入订单号" :hasPay="showOrder !== 3" style="flex: 1;"></Search>
      <div class="img-wrapper">
        <img :src="manaSearchImg" v-if="!screen" width="17" height="15" alt @click="show = !show" />
        <img :src="searchDefaultImg" v-else width="17" height="15" alt @click="show = !show" />
      </div>
    </div>
    <div class="list" ref="scroll">
      <PageList :params="params" ref="pageList" noListText="暂无订单信息" :getData="getOrderList">
        <template v-slot:default="slotProps">
          <orderItem
            class="withdrawalDetailItem"
            v-for="(item, index) in slotProps.dataList"
            :key="index"
            :isKtv="userType==='ktv'"
            :isMana="userType==='employee'"
            :data="item"
            :hasPay="showOrder !== 3"
          />
        </template>
      </PageList>
    </div>

    <van-popup
      key="popa"
      :lock-scroll="false"
      v-model="show"
      position="right"
      @close="popupCloseEvent"
      :style="{ width: '280px', height: '100%' }"
    >
      <div class="popupRightBox">
        <div class="content">
          <div v-if="userType !== 'ktv'">
            <p class="title">门店名称</p>
            <van-field class="order-input" clearable v-model="ktv_name" placeholder="请输入" />
          </div>
          <div>
            <p class="title">时间</p>
            <date-pick
              class="datePick"
              :isShowYear="false"
              @returnBack="returnBack"
              v-model="dateValue"
            ></date-pick>
          </div>
          <div class="box" v-for="(item, index) in popupData" :key="index">
            <span class="boxTitle">{{ item.title }}</span>
            <span class="boxList">
              <span
                :class="{
                  isSelected: popupValue[item.key] == item1.id ? true : false
                }"
                v-for="(item1, index1) in item.list"
                :key="index1"
                @click="selectedBtn(item.key, item1.id)"
              >{{ item1.text }}</span>
            </span>
          </div>
        </div>
        <div class="bottom">
          <span @click="searchBtn(1)">重置</span>
          <span class="a searchButton" @click="searchBtn">搜索</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import config from "@/config/index";
import { getDay, getDayTime } from "@/libs/util";
import datePick from "@/components/datePick";
import PageList from "@/components/pageList";
import orderItem from "@/components/listItems/orderItem";
import { getOrderList } from "@/api/order.js";
import { cacheMixins } from "@/libs/mixins";
import Search from "./components/search";

export default {
  name: "OrderSharing",
  mixins: [cacheMixins],
  data() {
    return {
      showDate: false, // 是否显示时间组件
      show: false,
      searchImg: require("../../assets/sousuo3.png"),
      manaSearchImg: require("../../assets/searchDefaultImg.png"),
      searchDefaultImg: require("../../assets/searchIcon.png"),
      getOrderList,
      dateValue: [],
      showpop: false,
      screen: false,
      ktv_name: "",
      params: {
        pay_time_start: getDayTime(new Date()),
        pay_time_end: getDayTime(new Date(), 1),
        ordering: "-pay_time",
        is_valid: 1
      },
      popupValue: {
        deal_status: 0,
        pay_way: 0
      },
      searchValue: {
        deal_status: 0,
        pay_way: 0
      },

      orderNum: 1092,
      money: 1092
    };
  },

  components: {
    PageList,
    Search,
    orderItem,
    datePick
  },
  created() {
    this.getAtr(this.params);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("set_params", this.params);
    next();
  },
  watch: {
    searchValue: {
      handler(newValue) {
        let flag = false;
        Object.keys(newValue).map(item => {
          if (newValue[item] != 0) {
            flag = true;
          }
        });
        this.screen = flag;
      },
      deep: true
    }
  },
  computed: {
    // 唯一ID
    user_id() {
      return this.$store.state.user.user_id;
    },
    // 用户类型
    userType() {
      return this.$store.state.user.usertype;
    },

    // 订单号可查询
    isOrderNum() {
      let bol = false;
      switch (this.userType) {
        // 平台方
        case "platform":
        case "agentibus":
        case "employee":
        case "industry_association": //机构
        case "advance_party": // 代垫方
        case "copyright_party": // 权利方
          break;
        default:
          bol = true;
          break;
      }
      return bol;
    },

    // 是否显示支付方式
    showOrder() {
      let infoType;
      switch (this.$store.state.user.usertype) {
        case "ktv":
        case "copyright_party":
          infoType = 1;
          break;
        case "platform":
        case "agentibus":
        case "employee":
          infoType = 2;
          break;
        case "industry_association":
        case "advance_party":
        case "vod":
          infoType = 3;
          break;
        default:
          infoType = 0;
      }
      return infoType;
    },
    popupData() {
      return this.userType === "ktv"
        ? config.order_deal_data
        : [config.order_deal_data[0]];
    }
  },
  methods: {
    clickDate() {
      this.showDate = true;
    },
    popupCloseEvent() {
      Object.assign(this.popupValue, this.searchValue);
    },
    selectedBtn(title, id) {
      this.popupValue[title] = id;
    },
    setDateValue(start, end) {
      this.$set(this.dateValue, 0, start);
      this.$set(this.dateValue, 1, end);
    },
    initialValue() {
      this.ktv_name = "";
      this.params = {
        pay_time_start: getDayTime(new Date()),
        pay_time_end: getDayTime(new Date(), 1),
        // user_id: this.$store.state.user.user_id,
        ordering: "-pay_time",
        is_valid: 1
      };
      this.getAtr(this.params);
      this.searchValue = {
        deal_status: 0,
        pay_way: 0
      };
      this.popupValue = {
        deal_status: 0,
        pay_way: 0
      };
      this.setDateValue(getDay(new Date()), getDay(new Date()));
      this.handleObj(this.params);
    },
    searchBtn(val) {
      Object.assign(this.searchValue, this.popupValue);
      this.show = false;
      if (val === 1) {
        this.initialValue();
        return;
      }
      if (this.dateValue.length === 0) {
        this.params = {
          pay_time_start: getDayTime(new Date()),
          pay_time_end: getDayTime(new Date(), 1),
          ktv_name: this.ktv_name,
          status: this.searchValue.deal_status,
          payment_platform: this.searchValue.pay_way,
          ordering: "-pay_time",
          is_valid: 1
        };
        this.getAtr(this.params);
      } else {
        this.params = {
          ktv_name: this.ktv_name,
          status: this.searchValue.deal_status,
          payment_platform: this.searchValue.pay_way,
          pay_time_start: this.dateValue[0] + " 00:00:00",
          pay_time_end: this.dateValue[1] + " 23:59:59",
          // user_id: this.$store.state.user.user_id,
          ordering: "-pay_time",
          is_valid: 1
        };
        this.getAtr(this.params);
      }
      this.handleObj(this.params);
    },

    getAtr(obj) {
      let str = "";
      if (this.userType === "ktv" || this.userType === "ktv_clerk") {
        str = "ktv_id";
        obj[str] = this.user_id.substring(4);
        return;
      } else if (this.userType === "agentibus") {
        str = "agent_id";
      } else if (this.userType === "advance_party") {
        str = "advance_id";
      }
      obj[str] = this.user_id;
    },

    formatter(type, value) {
      if (type === "year") {
        return `${value}`;
      } else if (type === "month") {
        return `${value}`;
      }
      return value;
    },
    returnBack(val) {
      this.dateValue = val;
      if (val[0] && val[1]) {
        var nowTime = new Date(val[0]); //通过时间构造函数进行实例化
        var orderTime = new Date(val[1]);
        var reduce = Math.ceil(
          (orderTime.getTime() - nowTime.getTime()) / 86400000
        );
        if (reduce > 31) {
          this.$toast.fail({
            duration: 2500, // 持续展示 toast
            forbidClick: true,
            overlay: true,
            className: "loadClass",
            message: "日期跨度不得超过31天"
          });
          this.setDateValue(getDay(new Date()), getDay(new Date()));
          return;
        }
      }
    },
    handleObj(obj) {
      for (let key in obj) {
        let newKey = obj[key];
        if (!newKey) delete obj[key];
      }
      setTimeout(() => {
        this.$refs.pageList.onReload();
      }, 50);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../static/style/mixin.scss";
.orderSharing {
  background-color: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 50px;
  right: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding-right: 13px;
    width: 100%;
    margin-bottom: 10px;
    .img-wrapper {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .searchicon {
      width: 20px;
    }
  }
  .list {
    flex: 1;
    overflow: auto;
    z-index: 11;
  }
  ::v-deep .van-pull-refresh {
    overflow: inherit !important;
  }
}
</style>
<style lang="scss">
.popupRightBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    background: rgba(243, 245, 247, 1);
    box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.16);
    font-size: 16px;
    font-weight: 500;
    & > span {
      display: flex;
      flex: 1;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    & > span:nth-child(2) {
      flex: 1;
    }
    .a {
      background: #0082ff;
      color: white;
    }
  }
  .content {
    padding: 20px 10px;
    .title {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 68, 1);
      line-height: 20px;
    }
    .datePick {
      height: 40px;
      border-radius: 2px;
      border: 1px solid rgba(243, 245, 247, 1);
      margin-top: 15px;
    }
    .box {
      .boxTitle {
        font-size: 14px;
        color: #444444;
        display: block;
        margin: 20px 0;
        font-weight: 600;
      }
      .boxList {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        & > span {
          display: inline-block;
          padding: 10px 20px;
          margin: 0 20px 20px 0;
          width: 85px;
          height: 35px;
          text-align: center;
          box-sizing: border-box;
          background: #f3f5f7;
          color: #444444;
        }
        & > span[class="isSelected"] {
          background: white;
          color: #0082ff;
          border-radius: 2px;
          border: 1px solid rgba(0, 130, 255, 1);
        }
      }
    }
  }
}
</style>
<style>
.orderSharing .datePick .content {
  justify-content: start !important;
}
.orderSharing .order-input::after {
  border-bottom: none;
}
.orderSharing .order-input {
  margin-top: 5px;
  padding: 8px 13px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  border: 1px solid rgba(243, 245, 247, 1);
  border-radius: 2px;
}
.isNoOrderNum {
  justify-content: flex-end !important;
  padding: 10px !important;
}
</style>
