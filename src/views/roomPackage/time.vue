<template>
  <div class="combo-time" ref="scroll">
    <p class="title">请选择每周可用时间</p>
    <van-checkbox-group class="week" v-model="result">
      <van-checkbox
        :name="item.id"
        :class="['item', result.includes(item.id)?'itemActive':'',result.includes(item.id)?'colorfff':'color000']"
        v-for="(item, index) in week"
        :key="index"
        checked-color="#07c160"
      >{{item.label}}</van-checkbox>
    </van-checkbox-group>
    <div class="time">
      <div class="p p1">
        <p class="p11 selet">起始时间</p>
        <p @click="showStartPop" class="p11 sele">{{currentTime|| '请选择'}}</p>
        <img class="right" width="6" height="10" :src="comboright" alt />
      </div>
      <div class="p p2">
        <p class="p11 selet">结束时间</p>
        <p @click="showEndPop" class="p11 sele">{{currentEndTime|| '请选择'}}</p>
        <img class="right" width="6" height="10" :src="comboright" alt />
      </div>
      <van-popup :close-on-click-overlay="false" v-model="show" position="bottom">
        <div class="timePicker">
          <van-datetime-picker
            :filter="filter"
            @confirm="selectStartTime"
            v-model="starInitVal"
            @cancel="startCancel"
            type="time"
          />
        </div>
      </van-popup>
      <van-popup :close-on-click-overlay="false" v-model="showEnd" position="bottom">
        <div class="timePicker">
          <van-datetime-picker
            :filter="filter"
            :stop-propagation="false"
            v-model="endInitVal"
            @confirm="selectEndTime"
            @cancel="endCancel"
            type="time"
          />
          <!-- <van-picker
            @confirm="selectEndTime"
            @cancel="showEnd = false"
            show-toolbar
            :columns="columns"
          />-->
        </div>
      </van-popup>
    </div>
    <van-button class="savebtn" @click="save" type="info">保存</van-button>
  </div>
</template>

<script>
import { cacheMixins } from "@/libs/mixins";
export default {
  name: "comboTime",
  mixins: [cacheMixins],
  data() {
    return {
      dateShow: false,
      currentDate: new Date(),
      starInitVal: 0,
      endInitVal: 0,
      columns: [
        {
          values: ["当日", "次日"],
          defaultIndex: 0
        },
        {
          values: [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ],
          defaultIndex: 1
        },
        {
          values: ["00", "30"],
          defaultIndex: 2
        }
      ],
      startTime: "", // 开始时间
      EndTime: "", // 终止时间
      show: false,
      showEnd: false,
      pks: null,
      currentTime: "00:00", // 开始显示时间
      currentEndTime: "00:00", // 结束显示时间
      comboright: require("@/assets/comboright.png"),
      result: [],
      week: [
        {
          label: "周一",
          id: "mon",
          index: 1
        },
        {
          label: "周二",
          id: "tues",
          index: 2
        },
        {
          label: "周三",
          id: "wed",
          index: 3
        },
        {
          label: "周四",
          id: "thur",
          index: 4
        },
        {
          label: "周五",
          id: "fri",
          index: 5
        },
        {
          label: "周六",
          id: "sat",
          index: 6
        },
        {
          label: "周日",
          id: "sun",
          index: 7
        }
      ]
    };
  },
  methods: {
    // 展示开始时间弹窗
    showStartPop() {
      this.show = true;
      this.starInitVal = this.currentTime;
    },
    // 展示结束时间弹窗
    showEndPop() {
      this.showEnd = true;
      this.endInitVal = this.currentEndTime;
    },
    //开始时间
    handleEndDateConfirm() {
      this.show = false;
      this.currentTime = this.currentDate;
    },
    // 保存
    save() {
      if (!this.result.length || !this.currentTime || !this.currentEndTime) {
        this.$toast({
          message: "可用时间段及起止时间填写完整后提交"
        });
        return;
      }
      // 起始时间不能小于结束时间
      if (this.EndTime < this.startTime) {
        this.$toast({
          message: "起始时间不能晚于结束时间"
        });
        return;
      }
      this.$store.commit("set_comboItemAttr", {
        attr: "period_time_end",
        val: this.EndTime
      });

      this.$store.commit("set_comboItemAttr", {
        attr: "period_time_start",
        val: this.startTime
      });

      this.$store.commit("set_comboItemAttr", {
        attr: "period_weekdays",
        val: this.result
      });
      this.$router.replace({
        name: "newcombo",
        query: {
          c: this.$route.query.c
        }
      });
      this.$router.go(-1);
    },
    // 时间处理
    timeChange(s) {
      let hour = Math.floor(s / 60);
      let minut = Math.floor(s % 60);
      let a = this.doubleChange(hour);
      let b = this.doubleChange(minut);
      return `${a}:${b}`;
    },
    doubleChange(val) {
      let a = 0;
      if (val < 10) {
        a = `0${val}`;
      } else {
        a = val;
      }
      return a;
    },
    // 开始时间取消
    startCancel() {
      this.show = false;
      this.starInitVal = this.currentTime;
    },
    // 结束时间取消
    endCancel() {
      this.showEnd = false;
      this.endInitVal = this.currentEndTime;
    },
    // 起始时间
    selectStartTime(val) {
      console.log(val);
      var arr = val.split(":");
      var a1 = parseInt(arr[0] * 60);
      var a2 = parseInt(arr[1] * 1);
      this.startTime = a1 + a2;
      this.show = false;
      this.currentTime = `${val}`;
    },
    // 终止时间
    selectEndTime(val) {
      var arr = val.split(":");
      var a1 = parseInt(arr[0]) * 60;
      var a2 = parseInt(arr[1]);
      this.EndTime = a1 + a2;
      this.showEnd = false;
      this.currentEndTime = `${val}`;
    },
    // 选项过滤
    filter(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 30 === 0);
      }
      return options;
    },
    init() {
      this.show = false;
      this.showEnd = false;
      if (!this.comboItem) {
        this.result = [];
        this.startTime = "";
        this.EndTime = "";
        this.currentTime = "";
        this.currentEndTime = "";
        return;
      }
      this.result = this.comboItem.period_weekdays;
      this.startTime = this.comboItem.period_time_start;
      this.EndTime = this.comboItem.period_time_end;
      this.currentTime = this.timeChange(this.startTime);
      this.currentEndTime = this.timeChange(
        this.EndTime === 2880 ? 0 : this.EndTime
      );
    }
  },
  activated() {
    this.init();
  },
  computed: {
    comboItem() {
      return this.$store.state.combo.comboItem;
    },
    currentWeek() {
      var arra = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      let a = [];
      this.result.forEach(i => {
        this.week.forEach(e => {
          if (e.id === i) {
            a.push(e.label);
          }
        });
      });
      a.sort(function(a, b) {
        var aIndex = arra.indexOf(a);
        var bIndex = arra.indexOf(b);
        return aIndex - bIndex;
      });
      return a;
    }
  }
};
</script>

<style lang="scss" scoped>
.combo-time {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fffeff;
  padding: 15px;
  .title {
    height: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(68, 68, 68, 1);
    line-height: 20px;
    margin-bottom: 15px;
  }
  .week {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 18px;
    .item {
      flex: 1;
      width: 46px;
      height: 46px;
      line-height: 46px;
      margin-right: 4px;
      box-shadow: 0px 2px 4px 0px rgba(255, 154, 0, 0.3);
      border-radius: 8px;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
    .itemActive {
      background: linear-gradient(
        180deg,
        rgba(255, 180, 0, 1) 0%,
        rgba(255, 144, 0, 1) 100%
      );
    }
  }
  .time {
    display: flex;
    justify-content: space-around;
    .p {
      flex: 1;
      height: 80px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      padding: 10px;
      position: relative;
    }
    .p1 {
      margin-right: 15px;
    }
    .p11 {
      margin: 10px;
    }
    .selet {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    .sele {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .right {
      position: absolute;
      top: 35px;
      right: 15px;
    }
  }
}
</style>
<style>
.combo-time .van-checkbox__icon {
  display: none !important;
}
.combo-time .colorfff .van-checkbox__label {
  color: #fff !important;
}
.combo-time .color000 .van-checkbox__label {
  color: #666666 !important;
}
.combo-time .color000 {
  background: rgba(248, 248, 248, 1);
  box-shadow: none !important;
}
.combo-time .savebtn {
  position: fixed;
  bottom: 20px;
  width: 90%;
  border: none;
  background: linear-gradient(
    180deg,
    rgba(61, 158, 255, 1) 0%,
    rgba(24, 82, 243, 1) 100%
  );
  border-radius: 4px;
}
</style>