<template>
  <div class="newCombo" ref="scroll">
    <!-- <van-cell title="套餐封面" value="请选择" is-link @click="show=true" /> -->
    <van-field clearable required maxlength="20" input-align="right" label="套餐名称" v-model="pkname" />
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
          placeholder="0"
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
      <van-field disabled input-align="right" label="套餐原价(元)" :value="total" />
      <van-field
        required
        type="number"
        label-width="120"
        input-align="right"
        clearable
        label="套餐 优惠价(元)"
        @blur="actual_priceFormat($event)"
        v-model="actual_price"
        placeholder="将计入到开房扫码的价格中"
      />
    </van-cell-group>

    <van-cell
      class="usetime"
      required
      title="可用时段"
      :value="timeStr"
      is-link
      :to="{path: 'comboTime', query: {c:this.$route.query.c}}"
    />
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
    <van-overlay :show="overlay">
      <div class="overlay">
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { cacheMixins } from "@/libs/mixins";
import {
  createContract,
  getPackageDetail,
  modiCombo,
  modiInfoCombo
} from "@/api/combo";
export default {
  name: "newcombo",
  mixins: [cacheMixins],
  data() {
    return {
      weekString: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], // 周数据
      weekSelected: [], // 可用时间一选择
      comboPart: "", // 套餐部分信息
      comboInfo: "", // 套餐模板信息
      timeObj: null, // 显示时间
      quaryStart: 0, // 开始时间
      quaryEnd: 0, // 结束时间
      quaryDay: [], // 区间时间
      week: [
        // 选项
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
      ],
      overlay: false, // 加载中
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
  created() {
    this.initData();
  },
  activated() {},
  computed: {
    comboItem() {
      return this.$store.state.combo.comboItem;
    },
    // 可用时段
    timeStr() {
      let a = [];
      if (this.comboItem) {
        this.comboItem.period_weekdays.forEach(i => {
          this.week.forEach(e => {
            if (e.id === i) {
              a.push(e.label);
            }
          });
        });
        a.sort((a, b) => {
          var aIndex = this.weekString.indexOf(a);
          var bIndex = this.weekString.indexOf(b);
          return aIndex - bIndex;
        });
        let atr = a.join("，");
        return (
          atr +
          " " +
          this.changeTime(this.comboItem.period_time_start) +
          " - " +
          this.changeTime(this.comboItem.period_time_end)
        );
      }
      return "";
    },
    // 套餐总价
    total() {
      let num = 0;
      for (let i = 0; i < this.listArr.length; i++) {
        const e = this.listArr[i];
        num += Number(e.count) * Number(e.original_price || 0);
      }
      return num.toFixed(2);
    },
    // 是否新增
    isAdd() {
      return this.$route.query.c;
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    console.log(from);

    if (from.name === "comboTime") {
      // todo
    }
    next();
  },
  methods: {
    // 获取套餐详情
    getComboDetailData() {},
    // 初始化数据
    setData() {
      console.log(this.$store.state.combo.comboItem);

      getPackageDetail(
        this.$store.state.user.ktv_id,
        this.$store.state.combo.comboItem.id
      ).then(r => {
        console.log(r.data);
        if (r.status < 400) {
          let _data = r.data;
          this.pkname = _data.name;
          this.upChecked = _data.enabled;
          this.actual_price = _data.actual_price;

          if (_data.goods.length === 0) {
            this.setFood();
            return;
          }
          this.listArr = _data.goods;
        }
      });
    },
    // 清空数据
    clearData() {
      this.pkname = "优选套餐";
      this.listArr = [
        {
          name: "",
          count: "",
          original_price: 0
        }
      ];
      this.actual_price = "";
      this.timeObj = null;
      this.upChecked = true;
    },
    // 添加数据
    adder() {
      this.$store.commit("set_comboItem", null);
      this.clearData();
    },
    // 修改数据
    editer() {
      this.clearData();
      this.setData();
    },
    //设置初始商品
    setFood() {
      this.listArr = [
        {
          name: "",
          count: "",
          original_price: 0
        }
      ];
    },
    // 初始化
    initData() {
      console.log(this.isAdd);
      if (
        (typeof this.isAdd === "string" && this.isAdd === "false") ||
        (typeof this.isAdd === "boolean" && !this.isAdd)
      ) {
        console.log("编辑");
        this.editer();
        return;
      }
      console.log("新增");
      this.adder();
    },
    // 修改套餐
    modiComboItem() {
      this.overlay = true;
      let arr = this.listArr.filter(function(e) {
        e.original_price = parseFloat(e.original_price);
        return e;
      });
      let data = {
        name: this.pkname,
        goods: !this.listArr[0].name ? [] : arr,
        period_weekdays: this.period_weekdays,
        period_time_start: this.period_time_start,
        period_time_end: this.period_time_end,
        enabled: this.upChecked,
        actual_price: this.actual_price
      };
      modiCombo(
        {
          ktv_id: this.$store.state.user.ktv_id,
          pk: this.$route.query.pk
        },
        data
      ).then(res => {
        this.overlay = false;
        if (res.status === 200 || res.status < 400) {
          this.$toast({
            message: "套餐修改成功",
            type: "success"
          });
          this.$router.push({
            name: "roomPackage"
          });
        }
      });
    },
    // 新增套餐
    addCombo() {
      this.overlay = true;
      let arr = this.listArr.filter(function(e) {
        e.original_price = parseFloat(e.original_price);
        return e;
      });
      let data = {
        name: this.pkname,
        goods: !this.listArr[0].name ? [] : arr,
        period_weekdays: this.comboItem.period_weekdays,
        period_time_start: this.comboItem.period_time_start,
        period_time_end: this.comboItem.period_time_end,
        enabled: this.upChecked,
        actual_price: this.actual_price
      };
      createContract(this.$store.state.user.ktv_id, data).then(res => {
        this.overlay = false;
        if (res.status === 200 || res.status < 400) {
          this.$toast({
            message: "套餐新增成功",
            type: "success"
          });
          this.$router.push({
            name: "roomPackage"
          });
        }
      });
    },
    // 格式化输入
    actual_priceFormat(e) {
      if (!e.target.value) {
        this.actual_price = "";
        return;
      }
      let value = 0;
      if (typeof Number(e.target.value) === "number") {
        value = Number(e.target.value).toFixed(2);
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
    changeTime(s) {
      let a = "";
      let b = "";
      let hour = Math.floor(s / 60);
      let minut = Math.floor(s % 60);
      if (hour < 10) {
        a = `0${hour}`;
      } else {
        a = hour;
      }
      if (minut < 10) {
        b = `0${minut}`;
      } else {
        b = minut;
      }
      return `${a}:${b}`;
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
            go = false;
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
      if (this.actual_price == 0) {
        this.toast("套餐优惠价不可为0");
        return;
      }

      if (!this.timeStr) {
        this.toast("请选择可用时段");
        return;
      }
      if (this.$route.query.c) {
        this.addCombo();
        return;
      }
      this.modiComboItem();
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
.overlay {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 45%;
}
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