<template>
	<div>
		<!-- <KTVData/> -->
		<ManagementData/>
	</div>
</template>

<script>
<<<<<<< HEAD
import dealCondition from "./components/dealCondition";
import linechart from "@/components/linechart/index";
import {
  orderShareTotalAmount,
  userAmount,
  monthRoyalty,
  orderStatistics,
  dayRoyalty,
  orderDayStatistics,
  getPersonNumber,
  orderMonthStatistics,
  getMoney,
  getCityKTVIterm
} from "@/api/mainPage";
import Empty from "@/components/EmptyComponent";
import datePick from "@/components/datePick";
import { cacheMixins } from "@/libs/mixins";
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
  name: "mainPage",
  mixins: [cacheMixins],
  components: {
    linechart,
    datePick,
    dealCondition,
    Empty
  },
  data() {
    return {
      unit: "", // 单位
      itemTitle: "", // 图表横纵坐标
      chartTitle: "", // 图表标题
      dialogShow: false,
      explain: require("../../assets/explain.png"),
      showData: true, // 展示数据
      balance: 0, // 账户余额
      totalMoney: 0, // 累计分成
      lastMonthMoney: "0.00", // 上月分成
      chartone: "chartone", // 图表id
      chartData: null, // 图表数据
      dateValue: [LDate, getDay(new Date())],
      isYearTime: [], //是否是年
      morePng: require("../../assets/more.png"), // 更多
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
    // 账户状态
    financialState() {
      return this.$store.state.user.financialState;
    },
    // 允许提现
    allow_withdraw() {
      return this.$store.state.user.allow_withdraw;
    },
    // 可提现
    withdrawalMoney() {
      return this.$store.state.user.withdrawalValue;
    },
    // 用户类型
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
    //是否是年
    isYear(val, year) {
      val === 2 ? (this.isYearTime = year) : (this.isYearTime = []);
    },

    // 返回的日期时间
    returnBack(val) {
      setTimeout(() => {
        if (val[0] && val[1] && this.isYearTime.length === 0) {
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
            this.searChartByTime(LDate, getDay(new Date()));
            return;
          }
        }
        this.searChartByTime(val[0], val[1]);
      }, 20);
    },

    // 初始化
    initial() {
      if (this.isUserShow) {
        this.getPersonCount();
      }
      if (this.userType === 1) {
        this.getOrderStatistics();
      }
      this.getOrderShareTotalAmount();
      this.getUserAmount();
      this.getMonthRoyalty();
      this.getTheCityKTVIterm();
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
    chartHandler(cal, title, xy, unit = "￥") {
      this.itemTitle = xy;
      this.chartTitle = title;
      this.unit = unit;

      if (!cal) return;
      cal(this.params).then(res => {
        this.chartData = null;
        if (res.results && res.results.length > 0) {
          this.chartData = res.results;
          this.showData = false;
          return;
        }

        this.showData = true;
      });
    },

    explainFunction() {
      this.dialogShow = true;
    },

    //账户余额
    getUserAmount() {
      userAmount({
        user_id: this.user_id
      }).then(res => {
        this.balance = res.amount;
      });
    },

    getDate() {
      let cyear;
      let cmonth;
      if (month === 0) {
        cyear = year - 1;
        cmonth = "12";
      } else {
        cyear = year;
        cmonth = month;
      }
      return {
        cyear,
        cmonth
      };
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
      this.showData = true;
      this.chartData = null;
      this.changeChartData(val);
    },

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
      if (!this.allow_withdraw) {
        this.$toast.fail({
          duration: 2500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "您的账户已冻结，请尽快联系商务人员处理。"
        });
        return;
      }
      if (!this.financialState) {
        this.$toast.fail({
          duration: 2500, // 持续展示 toast
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "暂未绑定银行账户信息，请尽快联系商务人员完成绑定。"
        });
        return;
      }

      this.routerGo("withdrawal");
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

    searChartByTime(start, end, tab = this.currentTab) {
      this.setDataValue(start, end);
      this.changeChartData(tab);
    },

    setParamsValue(start, end) {
      this.params = {};
      this.params.user_id = this.user_id;
      this.params.date_start = start;
      this.params.date_end = end;
      this.setDataValue(start, end);
    },

    setDataValue(start, end) {
      this.$set(this.dateValue, 0, start);
      this.$set(this.dateValue, 1, end);
    },

    handleChart(val) {
      switch (val) {
        case 0:
          if (this.userType === 1) {
            this.chartHandler(
              orderDayStatistics,
              "订单金额",
              "date*amount_display"
            );
          } else {
            this.chartHandler(dayRoyalty, "分成金额", "date*amount_display");
          }
          break;
        case 1:
          if (this.userType === 1) {
            this.chartHandler(dayRoyalty, "分成金额", "date*amount_display");
          } else {
            this.chartHandler(
              orderDayStatistics,
              "订单数",
              "date*count_display",
              "个"
            );
          }
          break;
        case 2:
          if (this.userType === 1) {
            this.chartHandler(
              orderDayStatistics,
              "订单数",
              "date*count_display",
              "个"
            );
          }
          break;
        default:
          break;
      }
    }
  },

  mounted() {
    this.initial();
  }
};
=======
	import KTVData from './KTVData'
	import ManagementData from './managementData'
	export default{
		components:{
			KTVData,
			ManagementData
		},
		data(){
			return{
				
			}
		}
	}
>>>>>>> wangyan
</script>

<style scoped="scoped" lang="less">
	
</style>