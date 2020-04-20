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
        <p @click="show=!show" class="p11 sele">{{currentTime|| '请选择'}}</p>
        <img class="right" width="6" height="10" :src="comboright" alt />
      </div>
      <div class="p p2">
        <p class="p11 selet">结束时间</p>
        <p @click="showEnd=!showEnd" class="p11 sele">{{currentEndTime|| '请选择'}}</p>
        <img class="right" width="6" height="10" :src="comboright" alt />
      </div>
      <van-popup :close-on-click-overlay="false" v-model="show" position="bottom">
        <div class="timePicker">
          <van-datetime-picker
            :filter="filter"
            @confirm="selectStartTime"
            @cancel="show = false"
            v-model="currentTime"
            type="time"
          />
        </div>
      </van-popup>
      <van-popup :close-on-click-overlay="false" v-model="showEnd" position="bottom">
        <div class="timePicker">
          <van-picker
            @confirm="selectEndTime"
            @cancel="showEnd = false"
            show-toolbar
            :columns="columns"
          />
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
      currentTime: "", // 开始显示时间
      currentEndTime: "", // 结束显示时间
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
    // 保存
    save() {
      if (!this.result.length || !this.currentTime || !this.currentEndTime) {
        this.$toast.fail({
          duration: 2500,
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "可用时间段及起止时间填写完整后提交"
        });
        return;
      }
      // 起始时间不能小于结束时间
      let a =
        this.currentTime.split(":")[0] ===
        this.currentEndTime.split(":")[0].substring(3);
      let d = this.currentEndTime.split(":")[0].substring(0, 2) === "当日";
      let b =
        this.currentTime.split(":")[0] !==
        this.currentEndTime.split(":")[0].substring(3);
      let e =
        this.currentTime.split(":")[0] >=
        this.currentEndTime.split(":")[0].substring(3);
      let c =
        this.currentTime.split(":")[1] >= this.currentEndTime.split(":")[1];
      if ((a && c && d) || (b && e && d)) {
        this.$toast.fail({
          duration: 2500,
          forbidClick: true,
          overlay: true,
          className: "loadClass",
          message: "起始时间不能晚于结束时间"
        });
        return;
      }
      this.$router.push({
        name: "newcombo",
        query: {
          period_weekdays: this.result,
          period_time_start: this.startTime,
          period_time_end: this.EndTime,
          currentEndTime: this.currentEndTime,
          currentTime: this.currentTime,
          currentWeek: this.currentWeek,
          pk: this.pks
        }
      });
    }, // 起始时间
    selectStartTime(val) {
      var arr = val.split(":");
      var a1 = parseInt(arr[0] * 60);
      var a2 = parseInt(arr[1] * 1);
      this.startTime = a1 + a2;
      this.show = false;
      this.currentTime = `${val}`;
    },
    // 终止时间
    selectEndTime(val) {
      let _val = `${val[1]}:${val[2]}`;
      var arr = _val.split(":");
      var a1 = parseInt(arr[0]) * 60;
      var a2 = parseInt(arr[1]);
      if (val[0] === "当日") {
        this.EndTime = a1 + a2;
      } else {
        this.EndTime = a1 + a2 + 24 * 60;
      }
      this.showEnd = false;
      this.currentEndTime = `${val[0]} ${_val}`;
    },
    // 选项过滤
    filter(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 30 === 0);
      }
      return options;
    },
    init() {
      this.currentTime = this.$store.state.combo.addNewComboItem.currentTime;
      this.pks = this.$store.state.combo.addNewComboItem.pk;
      this.currentEndTime = this.$store.state.combo.addNewComboItem.currentEndTime;
      this.result =
        this.$store.state.combo.addNewComboItem.period_weekdays || [];
    }
  },
  created() {
    this.init();
  },
  computed: {
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