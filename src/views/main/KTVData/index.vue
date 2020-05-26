<template>
  <div class="mainpage" ref="scroll">
    <!-- 账户余额 -->
    <div :class="['moneyshow', 'changeBanner', userType === 2 ? 'mana' : 'nomana']">
      <div class="balance">
        <p
          :class="['title', userType === 2 ? '' : 'manatitle']"
        >{{ userType === 2 ? "账户余额" : "平台分成情况" }}</p>
        <p v-if="userType === 2" class="num">￥{{ balance | toFixed2 }}</p>
      </div>
      <div v-if="userType === 2" class="help" @click="enterWithdrawalHelp">
        <span class="title">金额说明</span>
      </div>
      <div class="withdrawal-wrapper">
        <div class="total-wrapper">
          <div class="total firsttotal">
            <span class="title">
              <span>累计分成</span>
              <img
                @click="explainFunction"
                class="explain"
                :src="explain"
                alt
                width="10"
                height="10"
              />
            </span>
            <span class="num">￥{{ totalMoney | toFixed2 }}</span>
          </div>
          <div class="total">
            <span class="title">上月分成</span>
            <span class="num">￥{{ lastMonthMoney | toFixed2 }}</span>
          </div>
        </div>
        <div v-if="userType === 2" class="withdrawal">
          <div class="withdrawalLeft">
            <p class="title">可提现</p>
            <p class="num popupBoxConfirm">
              <span class="f18">￥</span>
              {{ withdrawalMoney | toFixed2 }}
            </p>
          </div>
          <div class="button">
            <van-button class="hollowBtnDefault" @click="enterWithdrawalDetail" type="default">提现记录</van-button>
            <van-button class="rightbtn entityBtnDefault" @click="enterWithdrawal" type="default">提现</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 平台交易情况 -->
    <deal-condition :isUserShow="isUserShow" :resData="resData" v-if="userType === 1" />
    <!-- 订单金额 -->
    <div class="chart-wrapper">
      <div class="tab-wrapper">
        <div class="tab">
          <van-tabs v-model="active" @click="clickTab">
            <van-tab v-if="userType === 1" title="订单金额"></van-tab>
            <van-tab title="分成金额"></van-tab>
            <van-tab title="订单数"></van-tab>
          </van-tabs>
        </div>
        <div class="tabmore" @click="enterOrder">
          <span>更多</span>
          <img width="5" height="9" :src="morePng" alt />
        </div>
        <div class="time">
          <p class="time-title">每日{{ chartTitle }}</p>
          <date-pick @isYear="isYear" @returnBack="returnBack" class="dataPick" v-model="dateValue"></date-pick>
        </div>
      </div>
      <div v-show="chartData" class="chartDiv">
        <linechart
          ref="lineChart"
          :xUnit="xUnit"
          :unit="unit"
          :itemTitle="itemTitle"
          :id="chartone"
          :chartData="chartData"
        ></linechart>
      </div>
      <div v-show="!chartData" class="loading">
        <Empty text="暂无数据" />
      </div>
    </div>
    <van-dialog
      confirmButtonText="知道了"
      confirmButtonColor="#0082FF"
      :showConfirmButton="false"
      v-model="dialogShow"
      title="累计分成金额"
    >
      <div class="dialogDiv">
        <div class="dialogDiv-p">
          <p>即商户通过历史关联的订单获得的分润金额（已扣除支付通道费率产生的费用）。</p>
          <p>注:若订单发生了退款行为，则该笔订单产生的分成也将会被退回</p>
        </div>
        <van-button @click="dialogShow = !dialogShow" class="dialogButton popupBoxConfirm">知道了</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dealCondition from "./components/dealCondition";
import linechart from "@/components/linechart/index";
import {
  profitInquiry, // 分润统计
  orderMainData, // 订单统计
  orderShareTotalAmount,
  userAmount,
  monthRoyalty,
  orderStatistics,
  orderDayStatistics,
  getPersonNumber,
  getCityKTVIterm
} from "@/api/mainPage";
import Empty from "@/components/EmptyComponent";
import datePick from "@/components/datePick";
import { getDay } from "@/libs/util";

const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth();

const lastDate = new Date(nowDate - 1000 * 60 * 60 * 24 * 30);
const lastY = lastDate.getFullYear();
const lastM = lastDate.getMonth() + 1;
const lastD = lastDate.getDate();
const LDate =
  lastY +
  "-" +
  (lastM < 10 ? "0" + lastM : lastM) +
  "-" +
  (lastD < 10 ? "0" + lastD : lastD);

export default {
  components: {
    linechart,
    datePick,
    dealCondition,
    Empty
  },
  data() {
    return {
      active: 0, // 标签页
      // 日期类型
      chooseDateType: [
        {
          type: "day",
          id: 0
        },
        {
          type: "month",
          id: 1
        },
        {
          type: "year",
          id: 2
        }
      ],
      unit: "", // 单位
      itemTitle: "", // 图表横纵坐标
      chartTitle: "", // 图表标题
      dialogShow: false,
      explain: require("../../../assets/explain.png"),
      balance: 0, // 账户余额
      totalMoney: 0, // 累计分成
      lastMonthMoney: "0.00", // 上月分成
      chartone: "chartone", // 图表id
      chartData: null, // 图表数据
      dateValue: [LDate, getDay(new Date())],
      isYearTime: [], //是否是年
      morePng: require("../../../assets/more.png"), // 更多
      currentTab: 0, // 当前标签
      params: null, // 参数
      resData: {
        orderTotal: 0, //订单总数
        finishOrder: 0, //已完成订单
        backOrder: 0, //退款订单
        dealNum: 0, //交易金额
        inNum: 0, //到账金额
        backNum: 0, //退款金额
        totalUser: 0, //用户总数
        cityNum: 0, //城市开通数
        ktvNum: 0, // ktv接入总数
        itermNum: 0 //终端数
      } // 平台交易情况
    };
  },
  computed: {
    // 时间类型
    isYearComputed() {
      if (Array.isArray(this.isYearTime)) {
        if (this.isYearTime.length) return true;
      }
      return false;
    },
    // 允许提现
    allow_withdraw() {
      return this.$store.state.withdrawal.allow_withdraw;
    },
    // 账户状态
    financialState() {
      return this.$store.state.withdrawal.financialState;
    },
    // 可提现
    withdrawalMoney() {
      return this.$store.state.withdrawal.withdrawalValue;
    },
    // 横坐标显示
    xUnit() {
      return !this.isYearComputed;
    },
    // 用户类型字符串
    usertype() {
      return this.$store.state.user.usertype;
    },
    // 用户类型数字
    userType() {
      if (
        this.$store.state.user.usertype === "platform" ||
        this.$store.state.user.usertype === "agentibus" ||
        this.$store.state.user.usertype === "employee"
      ) {
        return 1; // 管理平台
      }
      return 2; // 非管理平台
    },
    user_id() {
      return this.$store.state.user.user_id;
    },
    isUserShow() {
      return (
        this.$store.state.user.usertype === "platform" ||
        this.$store.state.user.usertype === "employee"
      );
    }
  },
  methods: {
    ...mapActions(["setPersonInfo"]),
    //是否是年
    isYear(val, year) {
      val === 2 ? (this.isYearTime = year) : (this.isYearTime = []);
    },

    // 返回的日期时间
    returnBack(val) {
      setTimeout(() => {
        if (val[0] && val[1] && this.isYearTime.length === 0) {
          var nowTime = new Date(val[0]);
          var orderTime = new Date(val[1]);
          var reduce = Math.ceil(
            (orderTime.getTime() - nowTime.getTime()) / 86400000
          );
          if (reduce > 31) {
            this.$toast.fail({
              duration: 1500, // 持续展示 toast
              forbidClick: true,
              overlay: true,
              className: "loadClass",
              message: "日期跨度不得超过31天"
            });
            this.searChartByTime(LDate, getDay(new Date()));
            return;
          }
        }
        let isYear = this.isYearTime.length;
        let s = isYear ? this.isYearTime[0] : val[0];
        let e = isYear ? this.isYearTime[1].substring(-2, 8) + "01" : val[1];
        this.searChartByTime(s, e);
      }, 20);
    },

    // 初始化
    initial() {
      this.isYearTime = [];
      this.chartData = null;
      this.active = 0;
      this.setPersonInfo();
      if (this.isUserShow) {
        this.getPersonCount();
      }
      if (this.userType === 1) {
        this.getOrderStatistics();
      }
      this.getOrderShareTotalAmount();
      this.getUserAmount();
      this.lastMonthProfitInquiry();
      // this.getTheCityKTVIterm();
      this.changeChartData(0);
    },

    //累计分成金额
    getOrderShareTotalAmount() {
      orderShareTotalAmount({
        user_id: this.user_id
      }).then(res => {
        this.totalMoney = res.share_amount;
      });
    },

    //获取城市统计
    getTheCityKTVIterm() {
      getCityKTVIterm({}).then(res => {
        if (res.data) {
          let resData = res.data;
          this.resData.cityNum = resData.ktv_annotate_city_count;
          this.resData.ktvNum = resData.ktv_contract_count;
          this.resData.itermNum = resData.room_count;
        }
      });
    },

    //用户总数
    getPersonCount() {
      var date = new Date();
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var currentdate = year + "-" + month + "-" + day;
      getPersonNumber(currentdate).then(res => {
        if (res.data && res.data.length) {
          this.resData.totalUser = res.data[0].user_population || 0;
          return;
        }
        this.resData.totalUser = 0;
      });
    },

    // 获取图表数据
    chartHandler(getAtr, cal, title, xy, unit = "￥") {
      // let isYear = this.isYearTime.length;
      this.itemTitle = xy;
      this.chartTitle = title;
      this.unit = unit;
      if (!cal) return;
      if (getAtr) {
        this.getAtr(this.params);
      } else {
        this.getAtr(this.params, 1);
      }
      cal(this.params).then(res => {
        this.chartData = null;
        if (res.data.results && res.data.results.length > 0) {
          this.datehandler_e(
            res.data.results,
            res.data.results[0].date,
            res.data.results[res.data.results.length - 1].date,
            getAtr,
            this.isYearComputed
          );
          return;
        }
      });
    },

    explainFunction() {
      this.dialogShow = true;
    },
    // 时间处理
    datehandler_e(data, a1, a2, isOrder, isYear) {
      let dateArr = isYear
        ? this.getBetweenStartAndEndYear(a1, a2)
        : this.getBetweenStartAndEndDate(a1, a2);
      let dateArr1 = [];
      let a = data;
      for (let i = 0; i < dateArr.length; i++) {
        let obj = {};
        const e1 = dateArr[i];
        obj.date = e1;
        obj.amount_display = "0";
        if (!isOrder) {
          obj.amount_display = 0;
        } else {
          obj.count = 0;
        }
        dateArr1.push(obj);
      }
      for (let j = 0; j < dateArr1.length; j++) {
        const e2 = dateArr1[j];
        for (let k = 0; k < a.length; k++) {
          const e3 = a[k];
          if (e2.date === e3.date) {
            dateArr1[j] = a[k];
          }
        }
      }
      for (let o = 0; o < dateArr1.length; o++) {
        if (dateArr1[o].hasOwnProperty("amount_display")) {
          dateArr1[o].amount_display = Number(dateArr1[o].amount_display);
        }
        if (dateArr1[o].hasOwnProperty("count")) {
          dateArr1[o].count = Number(dateArr1[o].count);
        }
      }
      this.chartData = dateArr1;
    },
    // 获取时间
    getBetweenStartAndEndDate(day1, day2) {
      var getDate = function(str) {
        var tempDate = new Date();
        var list = str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1] - 1);
        tempDate.setDate(list[2]);
        return tempDate;
      };
      var date1 = getDate(day1);
      var date2 = getDate(day2);
      if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
      }
      date1.setDate(date1.getDate() + 1);
      var dateArr = [];
      var i = 0;
      while (
        !(
          date1.getFullYear() == date2.getFullYear() &&
          date1.getMonth() == date2.getMonth() &&
          date1.getDate() == date2.getDate()
        )
      ) {
        var dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
          dayStr = "0" + dayStr;
        }
        dateArr[i] =
          date1.getFullYear() +
          "-" +
          (Number(date1.getMonth() + 1) > 10
            ? date1.getMonth() + 1
            : `0${date1.getMonth() + 1}`) +
          "-" +
          dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
      }
      dateArr.splice(0, 0, day1);
      dateArr.push(day2);
      return dateArr;
    },
    //账户余额
    getUserAmount() {
      userAmount({
        user_id: this.user_id
      })
        .then(res => {
          this.balance = res.amount;
        })
        .catch(e => {
          this.$toast.fail({
            duration: 2500, // 持续展示 toast
            forbidClick: true,
            overlay: true,
            className: "loadClass",
            message: e.data.user_id
          });
        });
    },

    getDate() {
      let cyear;
      let cmonth;
      if (month === 0) {
        cyear = year - 1;
        cmonth = "12";
      } else {
        if (Number(year) < 10) {
          cyear = `0${year}`;
        } else {
          cyear = year;
        }
        if (Number(month) < 10) {
          cmonth = `0${month}`;
        } else {
          cmonth = month;
        }
      }
      return {
        cyear,
        cmonth
      };
    },
    // 获取年列表
    getBetweenStartAndEndYear(start, end) {
      return this.getDateList(start, end);
    },
    // 获取日期列表
    getDateList(start, end, type = "month") {
      const startTime = this.getYearDate(start, type);
      const endTime = this.getYearDate(end, type);
      const arr = [];
      do {
        const year = startTime.getFullYear();
        const month =
          startTime.getMonth() + 1 < 10
            ? "0" + (startTime.getMonth() + 1)
            : startTime.getMonth() + 1;
        const day =
          startTime.getDate() < 10
            ? "0" + startTime.getDate()
            : startTime.getDate();
        type === "date"
          ? startTime.setDate(startTime.getDate() + 1) &&
            arr.push(year + "-" + month + "-" + day)
          : startTime.setMonth(startTime.getMonth() + 1) &&
            arr.push(year + "-" + month);
      } while (endTime.getTime() - startTime.getTime() >= 0);
      return arr;
    },
    // 获取日期
    getYearDate(datestr, type) {
      const temp = datestr.split("-");
      const date =
        type === "date"
          ? new Date(temp[0], parseInt(temp[1]) - 1, temp[2])
          : new Date(temp[0], parseInt(temp[1]) - 1);
      return date;
    },
    // 上月分成
    lastMonthProfitInquiry() {
      let monthVal =
        Number(this.getDate().cmonth) < 10
          ? `0${Number(this.getDate().cmonth)}`
          : this.getDate().cmonth;
      let params = {
        ordering: "date",
        date: `${this.getDate().cyear}-${monthVal}-01`,
        user_id: this.user_id,
        date_type: "month"
      };
      this.getAtrForLastMonth(params);
      profitInquiry(params).then(res => {
        if (res.status === 200) {
          if (res.data.results.length) {
            this.lastMonthMoney = res.data.results[0].amount_display;
            return;
          }
          this.lastMonthMoney = 0;
        }
      });
    },
    //月分成
    getMonthRoyalty() {
      monthRoyalty({
        date: `${this.getDate().cyear}-${this.getDate().cmonth}-01`,
        user_id: this.user_id
      }).then(res => {
        if (res.results && res.results.length === 0) {
          return (this.lastMonthMoney = "0.00");
        }
        this.lastMonthMoney = res.results[0].amount_display;
      });
    },

    //订单汇总
    getOrderStatistics() {
      orderStatistics({
        agent_id: this.user_id
      }).then(res => {
        this.resData.orderTotal = res.order_count; //订单总数
        this.resData.finishOrder = res.complete_order_count; //已完成订单
        this.resData.backOrder = res.refund_order_count; //退款订单
        this.resData.dealNum = res.transaction_amount; //交易金额
        this.resData.inNum = res.pay_amount; //到账金额
        this.resData.backNum = res.refund_amount; //退款金额
      });
    },

    // Tab事件
    clickTab(val) {
      this.active = val;
      this.isYearTime = [];
      this.chartData = null;
      this.setParamsValue(LDate, getDay(new Date()));
      this.params.date_type = "day";
      this.changeChartData(val);
    },
    // 设置参数
    changeParams(val) {
      if (val) {
        this.setParamsValue(LDate, getDay(new Date()));
        return;
      }

      if (this.isYearTime.length > 0) {
        this.setParamsValue(`${this.isYearTime[0]}`, `${this.isYearTime[1]}`);
        return;
      }
      this.setParamsValue(
        this.dateValue[0] || LDate,
        this.dateValue[1] || getDay(new Date())
      );
    },
    // 后台新增接口
    getAtr(obj, f) {
      let isYear = this.isYearTime.length;
      this.params.date_type = isYear ? "month" : "day";
      let str = "";
      if (f) {
        if (this.usertype === "agentibus") {
          obj.data_type = "agent";
          str = "agent_id";
        } else {
          obj.data_type = "nation";
          return;
        }
        obj[str] = this.user_id;
        return;
      }
      if (this.usertype === "ktv" || this.usertype === "ktv_clerk") {
        str = "ktv_id";
        obj.data_type = "ktv";
        obj[str] = this.user_id.substring(4);
        return;
      } else if (this.usertype === "agentibus") {
        obj.agent_id = "agent";
        str = "agent_id";
      } else if (this.usertype === "advance_party") {
        obj.data_type = "advance";
        str = "advance_id";
      }
      obj[str] = this.user_id;
    },
    // 展示图表信息
    async changeChartData(val) {
      setTimeout(() => {
        if (this.currentTab !== val) {
          this.changeParams(1);
          this.handleChart(val);
          this.currentTab = val;
          return;
        }
        this.currentTab = val;
        this.changeParams();
        this.handleChart(val);
      }, 20);
    },

    // 金额说明
    enterWithdrawalHelp() {
      this.routerGo("withdrawalHelp");
    },

    // 提现记录
    enterWithdrawalDetail() {
      this.routerGo("withdrawalDetail");
    },

    // 提现确认
    enterWithdrawal() {
      if (!this.financialState) {
        this.$toast.fail({
          duration: 1500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message:
            "暂未绑定或正在变更银行账户信息，请尽快联系商务人员完成绑定或等待银行审核通过后方可提现"
        });
        return;
      }
      if (!this.allow_withdraw) {
        this.$toast.fail({
          duration: 1500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "您的账户已冻结，请尽快联系商务人员处理。"
        });
        return;
      }
      this.routerGo("withdrawal");
    },

    // 获取上月参数属性值
    getAtrForLastMonth(obj) {
      let str = "";
      if (this.usertype === "agentibus") {
        obj.data_type = "agent";
        str = "agent_id";
      } else {
        obj.data_type = "nation";
        return;
      }
      obj[str] = this.user_id;
    },
    // 路由跳转通用
    routerGo(pathname) {
      this.$router.push({
        path: `/${pathname}`
      });
    },
    // 路由跳转通用
    enterOrder() {
      this.routerGo("OrderSharing");
    },
    // 根据时间搜索图表
    searChartByTime(start, end, tab = this.currentTab) {
      this.setDataValue(start, end);
      this.changeChartData(tab);
    },

    // 设置参数值
    setParamsValue(start, end) {
      this.params = {};
      this.params.date_start = start;
      this.params.date_end = end;
      this.params.ordering = "date";
      this.params.user_id = this.user_id;
      this.setDataValue(start, end);
    },
    //  设置时间
    setDataValue(start, end) {
      this.$set(this.dateValue, 0, start);
      this.$set(this.dateValue, 1, end);
    },

    //图表设置数据
    handleChart(val) {
      switch (val) {
        case 0:
          if (this.userType === 1) {
            this.chartHandler(
              0,
              orderDayStatistics,
              "订单金额",
              "date*amount_display"
            );
          } else {
            this.chartHandler(
              0,
              profitInquiry,
              "分成金额",
              "date*amount_display"
            );
          }
          break;
        case 1:
          if (this.userType === 1) {
            this.chartHandler(
              0,
              profitInquiry,
              "分成金额",
              "date*amount_display"
            );
          } else {
            this.chartHandler(1, orderMainData, "订单数", "date*count", "个");
          }
          break;
        case 2:
          if (this.userType === 1) {
            this.chartHandler(1, orderMainData, "订单数", "date*count", "个");
          }
          break;
        default:
          break;
      }
    }
  },

  activated() {
    this.initial();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/style/base.scss";
@import "../../../static/style/mixin.scss";
.mainpage {
  height: 100%;
  overflow-y: auto;
  .moneyshow {
    margin-bottom: 10px;
    position: relative;
    padding: 23px 0 60px 15px;
    font-size: 14px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: #fff;
    .balance {
      .title {
        margin-bottom: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 22px;
        @include colorsize(#fff, 16px);
      }
      .manatitle {
        margin-bottom: 0px !important;
      }
      .num {
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        line-height: 21px;
        @include colorsize(#fff, 18px);
      }
    }
    .help {
      position: absolute;
      top: 16px;
      right: 30px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
    .withdrawal-wrapper {
      display: flex;
      flex-direction: column;
      margin: 20px auto 0 auto;
      position: absolute;
      width: 345px;
      z-index: 15;
      .total-wrapper {
        padding: 18px 0 20px 0;
        display: flex;
        background-color: #fff;
        box-shadow: 0px 2px 10px 2px rgba(61, 191, 248, 0.11);
        border-radius: 6px;
        margin-bottom: 10px;
        .total {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(108, 114, 124, 1);
            line-height: 17px;
          }
          .num {
            margin-top: 15px;
            font-size: 20px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 91, 63, 1);
            line-height: 11px;
          }
        }
        .firsttotal {
          border-right: 1px solid #e9eef9;
          .title {
            position: relative;
            .explain {
              position: absolute;
              top: 3px;
              right: -15px;
            }
          }
        }
      }
      .withdrawal {
        width: 100%;
        display: flex;
        background: #f7f7f7;
        padding: 17px 10px;
        align-items: center;
        .withdrawalLeft {
          .title {
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 17px;
            @include colorsize(rgba(108, 114, 124, 1), 12px);
            margin-bottom: 6px;
          }
          .num {
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            line-height: 27px;
            height: 27px;
            font-size: 22px;
          }
        }
        .button {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          .rightbtn {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .mana {
    height: 287px;
  }
  .nomana {
    height: 170px;
  }
  .chart-wrapper {
    margin-top: 10px;
    padding-bottom: 30px;
    width: 100%;
    background-color: #fff;
    .tab-wrapper {
      padding-top: 13px;
      width: 100%;
      position: relative;
      overflow: hidden;
      .tab {
        width: 200px;
      }
      .tabmore {
        float: right;
        position: absolute;
        top: 25px;
        right: 20px;
        span,
        img {
          font-size: 10px;
          vertical-align: middle;
          line-height: 14px;
        }
        span {
          display: inline-block;
          margin-right: 5px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 15px;
        width: 100% !important;
        .time-title {
          padding-top: 4px;
        }
        .title-high {
          font-size: 15px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(68, 68, 68, 1);
        }
        p {
          padding-left: 10px;
          width: 100px;
          height: 21px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(108, 114, 124, 1);
        }
      }
    }
    .chartDiv {
      width: 100%;
    }
    .loading {
      text-align: center;
      padding: 40%;
      height: 350px;
    }
  }
}
.mainpage .van-button--normal {
  width: 90px;
  border-radius: 16px;
  font-size: 12px;
  padding: 0;
  height: 35px;
  line-height: 35px;
  display: inline-block;
}
::v-deep .van-tabs__line {
  width: 55px !important;
  height: 6px;
  bottom: 28px;
  background: linear-gradient(
    180deg,
    rgba(0, 184, 255, 0) 0%,
    rgba(0, 130, 255, 1) 100%
  );
}
::v-deep .dataPick {
  width: 200px;
}
</style>
<style>
.mainpage [class*="van-hairline"]::after {
  border: none !important;
}
.mainpage .dialogDiv,
.mainpage .dialogDiv-p {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mainpage .dialogDiv-p {
  padding: 20px 30px 0 30px;
}
.mainpage .dialogButton {
  border-top: 1px solid #e7e7e7;
  height: 50px !important;
  line-height: 50px !important;
  font-size: 16px !important;
  width: 100% !important;
  border-radius: 0 !important;
}
.mainpage .dialogDiv-p p {
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
  color: #888888;
}
</style>
