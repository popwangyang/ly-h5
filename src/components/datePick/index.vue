<template>
  <div class="datePicker">
    <div class="content" @click="showBtn">
      <span v-if="showValues.length != 0">{{ showValues[0] }} 至 {{ showValues[1] }}</span>
      <span v-else>-- 至 --</span>
    </div>
    <div class="icon">
      <van-icon name="arrow-down" />
    </div>
    <van-popup get-container="body" v-model="show" position="bottom" :style="{ height: '300px' }">
      <div class="popupBox">
        <div class="van-hairline--top-bottom van-picker__toolbar" style="align-items: center;">
          <button class="van-picker__cancel" style="color: #999999;" @click="cancelBtn">取消</button>
          <TabBottom v-if="isShowYear" :initTabValue="state" @event="changBtn" />
          <button class="van-picker__confirm popupBoxConfirm" @click="okBtn">确认</button>
        </div>
        <DayContent v-model="dayValue" v-if="state == 1" />
        <YearContent v-model="yearValue" v-if="state == 2" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import DayContent from "./components/dayContent";
import YearContent from "./components/yearContent";
import TabBottom from "./components/tabButton";
import { getDay } from "@/libs/util";
export default {
  components: {
    TabBottom,
    DayContent,
    YearContent
  },
  props: {
    isShowYear: {
      type: Boolean,
      default: true
    },
    dateValue: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "dateValue",
    event: "returnBack"
  },
  data() {
    return {
      show: false,
      state: 0,
      showValues: [],
      dayValue: [],
      yearValue: []
    };
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.state = 0;
        this.init();
      }
    }
  },
  methods: {
    changBtn(index) {
      this.state = index;
    },
    cancelBtn() {
      this.show = false;
    },
    showBtn() {
      this.show = true;
    },
    okBtn() {
      this.$emit("isYear", this.state, this.yearValue);
      if (this.state == 1) {
        if (this.dayValue[0] != "" && this.dayValue[1] != "") {
          this.showValues = this.dayValue;
          this.$emit("returnBack", this.showValues);
          this.show = false;
        }
      } else {
        this.showValues = this.yearValue;
        this.$emit("returnBack", this.yearValue);
        this.show = false;
      }
    },
    init() {
      let startTime = null;
      let endTime = null;
      let time = new Date();
      let year = time.getFullYear();
      let yearStart = year + "-01-01";
      let yearEnd = year + "-12-31";
      if (this.dateValue.length == 0) {
        startTime = getDay(time);
        endTime = getDay(time);
      } else {
        startTime = this.dateValue[0];
        endTime = this.dateValue[1];
      }
      this.showValues = [startTime, endTime];
      this.dayValue = this.showValues;
      this.yearValue = [yearStart, yearEnd];
      setTimeout(() => {
        this.state = 1;
      }, 0);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped="scoped" lang="less">
.datePicker {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  border: 1px solid rgba(198, 203, 212, 1);
  padding: 2px 10px;
  .popupBox {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
