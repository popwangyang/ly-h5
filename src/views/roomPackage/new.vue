<template>
  <div class="newCombo">
    <!-- <van-cell title="套餐封面" value="请选择" is-link @click="show=true" /> -->
    <van-field required maxlength="20" input-align="right" label="套餐名称" v-model="pkname" />
    <div v-for="(item, index) in listArr" :key="index" class="newCombo-item">
      <!-- <img class="del" width="20" height="20" :src="listImg" alt /> -->
      <span v-if="listArr.length !== 1" @click="del(index)" class="del">删除</span>
      <van-cell-group :title="`商品${index+1}`">
        <van-field
          input-align="right"
          maxlength="20"
          label="商品名称"
          clearable
          v-model="item.name"
          placeholder="请输入"
        />
        <van-field
          input-align="right"
          type="digit"
          label="数量"
          clearable
          v-model="item.count"
          placeholder="请输入"
        />
        <van-field
          type="number"
          input-align="right"
          label="单价"
          clearable
          v-model="item.original_price"
          @blur="formatter($event, index)"
          placeholder="请输入"
        />
        <van-field
          disabled
          class="field-center"
          v-if="index === listArr.length-1"
          input-align="center"
        >
          <div slot="label" class="addMusic">
            <img width="14" height="14" :src="addImg" alt />
            <span style="margin-left: 5px;" @click="add">增加商品</span>
          </div>
        </van-field>
      </van-cell-group>
    </div>
    <van-cell-group>
      <van-field disabled input-align="right" label="套餐总价(元)" v-model="total" />
      <van-field
        required
        type="number"
        label-width="120"
        input-align="right"
        clearable
        label="套餐优惠价(元)"
        @blur="actual_priceFormat($event)"
        v-model="actual_price"
        placeholder="将计入到开房扫码的价格中"
      />
    </van-cell-group>

    <van-cell class="usetime" required title="可用时段" :value="useTime" is-link to="comboTime" />
    <van-cell required title="上架状态">
      <van-switch v-model="upChecked" size="24px" />
    </van-cell>
    <!-- <van-cell title="推荐标志">
      <van-switch v-model="signChecked" size="24px" />
    </van-cell>-->

    <div style="width:100%;text-align: center;">
      <van-button class="savebtn" @click="save" type="info">保存</van-button>
    </div>
    <!-- 推荐 -->
    <van-action-sheet :round="false" class="uppop" v-model="show" title>
      <div class="uppop-wrapper">
        <div class="top">
          <van-button type="default">取消</van-button>
          <van-button type="default">确定</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { createContract } from "@/api/combo";
export default {
  name: "",
  data() {
    return {
      pkname: "优选套餐", // 套餐默认名称
      show: false,
      actual_price: "", // 优惠价
      upChecked: true, // 上架状态
      actions: [
        { name: "选项", color: "#07c160" },
        { loading: true },
        { name: "禁用选项", disabled: true }
      ],
      signChecked: false, // 推荐标志
      listArr: [
        {
          name: "",
          count: "",
          original_price: 0
        }
      ],
      listImg: require("@/assets/alipay.png"),
      addImg: require("@/assets/addHome.png")
    };
  },
  computed: {
    // 可用时段
    useTime() {
      return `${this.currentWeek}${this.currentWeek ? "；" : ""}${
        this.currentTime === 0
          ? ""
          : this.currentTime + "-" + this.currentEndTime
      }`;
    },
    // 套餐总价
    total() {
      if (this.listArr.length === 1) return 0;
      return 1;
    },
    // 日期
    period_weekdays() {
      return this.$route.query.period_weekdays || [];
    },
    // 开始时间
    period_time_start() {
      return this.$route.query.period_time_start || 0;
    },
    // 结束时间
    period_time_end() {
      return this.$route.query.period_time_end || 0;
    },
    // 开始时间显示
    currentTime() {
      return this.$route.query.currentTime || 0;
    },
    // 结束时间显示
    currentEndTime() {
      return this.$route.query.currentEndTime || 0;
    },
    // 日期显示
    currentWeek() {
      return this.$route.query.currentWeek
        ? this.$route.query.currentWeek.join("、")
        : "";
    }
  },
  methods: {
    // 新增套餐
    addCombo() {
      let data = {
        name: this.pkname,
        goods: !this.listArr[0].name ? [] : this.listArr,
        period_weekdays: this.period_weekdays,
        period_time_start: this.period_time_start,
        period_time_end: this.period_time_end,
        enabled: this.upChecked,
        actual_price: this.actual_price
      };
      createContract(this.$store.state.user.ktv_id, data).then(res => {
        if (res.status === 200 || res.status < 400) {
          this.$toast({
            message: "套餐新增成功",
            type: "success"
          });
        }
      });
    },
    // 格式化输入
    actual_priceFormat(e) {
      let value = 0;
      if (
        e.target.value.substring(0, 1) === "0" ||
        Number(e.target.value) === 0
      ) {
        this.actual_price = 0;
        return;
      }
      if (typeof Number(e.target.value) === "number") {
        value = Number(e.target.value).toFixed(2);
      } else {
        value = 0;
      }
      this.actual_price = value;
    },
    // 格式化输入
    formatter(e, i) {
      let value = 0;
      if (
        e.target.value.substring(0, 1) === "0" ||
        Number(e.target.value) === 0
      ) {
        this.listArr[i].original_price = 0;
        return;
      }
      if (typeof Number(e.target.value) === "number") {
        value = Number(e.target.value).toFixed(2);
      } else {
        value = 0;
      }
      this.listArr[i].original_price = value;
    },
    onCancel() {
      this.show = false;
    },
    // 删除
    del(index) {
      this.listArr.splice(index, 1);
    },
    generationObj() {
      return {
        name: "",
        count: "",
        original_price: ""
      };
    },
    // 新增商品
    add() {
      this.listArr.push(this.generationObj());
    },
    // 保存
    save() {
      let go = true;
      if (!this.pkname) {
        this.toast("套餐名称不可为空");
        return;
      }

      if (this.listArr.length > 1) {
        for (let i = 0; i < this.listArr.length; i++) {
          const el = this.listArr[i];
          if (!el.name || !el.count || !el.original_price) {
            this.toast("商品信息请输入完整");
            this.go = false;
            break;
          }
        }
        if (!go) return;
      }

      if (this.listArr.length === 1) {
        let ell = this.listArr[0];
        if (
          (ell.name && !ell.count) ||
          (ell.name && !ell.original_price) ||
          (ell.count && !ell.name) ||
          (ell.count && !ell.original_price) ||
          (ell.original_price && !ell.name) ||
          (ell.original_price && !ell.count)
        ) {
          this.toast("商品信息请输入完整");
          return;
        }
      }

      if (this.actual_price === "") {
        this.toast("请输入套餐优惠价");
        return;
      }
      if (this.actual_price === 0) {
        this.toast("套餐优惠价不可为0");
        return;
      }
      this.addCombo({});
    },
    // 提示
    toast(message) {
      this.$toast.fail({
        duration: 2500,
        forbidClick: true,
        overlay: true,
        className: "loadClass",
        message
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.newCombo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  .newCombo-item {
    position: relative;
    .del {
      position: absolute;
      right: 15px;
      top: 15px;
      color: #ff5562;
    }
  }
  .savebtn {
    width: 90%;
    border: none;
    margin: 20px auto;
    background: linear-gradient(
      180deg,
      rgba(61, 158, 255, 1) 0%,
      rgba(24, 82, 243, 1) 100%
    );
    border-radius: 4px;
  }
  .uppop {
    .uppop-wrapper {
      padding: 16px 16px 160px;
      .top {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.newCombo .addMusic {
  display: flex;
  align-items: center;
  padding-left: 45%;
}
</style>
<style>
.field-center {
  background-color: rgba(239, 238, 243, 1);
}
.field-center .van-field__label {
  flex: 6;
}
.newCombo .van-cell__value {
  text-align: center !important;
}
</style>