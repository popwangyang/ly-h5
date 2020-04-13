<template>
  <div class="newCombo">
    <!-- <van-cell title="套餐封面" value="请选择" is-link @click="show=true" /> -->
    <van-cell title="套餐名称" value="请输入" />
    <div v-for="(item, index) in listArr" :key="index" class="newCombo-item">
      <!-- <img class="del" width="20" height="20" :src="listImg" alt /> -->
      <span v-if="listArr.length !== 1" @click="del(index)" class="del">删除</span>
      <van-cell-group :title="`商品${index+1}`">
        <van-field input-align="right" label="商品名称" v-model="item.name" placeholder="请输入" />
        <van-field input-align="right" label="数量" v-model="item.num" placeholder="请输入" />
        <van-field input-align="right" label="单价" v-model="item.price" placeholder="请输入" />
        <van-field
          class="field-center"
          v-if="index === listArr.length-1"
          @click="add"
          input-align="center"
        >
          <div slot="label" class="addMusic">
            <img width="14" height="14" :src="addImg" alt />
            <span style="margin-left: 5px;">增加商品</span>
          </div>
        </van-field>
      </van-cell-group>
    </div>
    <van-cell-group>
      <van-field disabled input-align="right" label="套餐总价(元)" v-model="total" />
      <van-field
        label-width="120"
        input-align="right"
        label="套餐优惠价(元)"
        v-model="totalShare"
        placeholder="请输入"
      />
    </van-cell-group>

    <van-cell title="可用时段" value="请选择" is-link />
    <van-cell title="上架状态">
      <van-switch v-model="upChecked" size="24px" />
    </van-cell>
    <!-- <van-cell title="推荐标志">
      <van-switch v-model="signChecked" size="24px" />
    </van-cell>-->

    <div style="width:100%;text-align: center;">
      <van-button class="savebtn" @click="save" type="info">保存</van-button>
    </div>
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
export default {
  name: "",
  data() {
    return {
      show: false,
      total: "", // 套餐总价
      totalShare: "", // 优惠价
      upChecked: false, // 上架状态
      actions: [
        { name: "选项", color: "#07c160" },
        { loading: true },
        { name: "禁用选项", disabled: true }
      ],
      signChecked: false, // 推荐标志
      listArr: [
        {
          name: "",
          num: "",
          price: ""
        }
      ],
      listImg: require("@/assets/alipay.png"),
      addImg: require("@/assets/addHome.png")
    };
  },
  computed: {},
  methods: {
    onCancel() {
      this.show = false;
    },
    del(index) {
      this.listArr.splice(index, 1);
    },
    generationObj() {
      return {
        name: "",
        num: "",
        price: ""
      };
    },
    add() {
      this.listArr.push(this.generationObj());
    },
    save() {
      console.log(this.listArr);
    }
  }
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
    margin-top: 20px;
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
</style>