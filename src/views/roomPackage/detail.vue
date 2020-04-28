<template>
  <div class="comboDetail" ref="scroll">
    <div v-if="combo">
      <div class="title-wrapper">
        <div class="left">
          <span class="name">{{combo.name}}</span>
          <span class="status">{{combo.enabled?"已上架":"未上架"}}</span>
        </div>
      </div>

      <div class="combo-detail-cont" v-if="combo.goods && Array.isArray(combo.goods)">
        <div class="title">
          <span>商品名称</span>
          <span>数量</span>
          <span>单价</span>
        </div>
        <div class="detailcont" v-for="(item, index) in combo.goods" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.count || 0}}</span>
          <span>{{item.original_price |toFixed2}}元</span>
        </div>
      </div>

      <p class="noneInfo" v-if="combo.goods">
        <van-loading type="spinner" v-if="!combo.goods"></van-loading>
        <span v-if="combo.goods.length === 0">暂无商品信息</span>
      </p>

      <div class="detail-bottom">
        <div class="leftpart">
          <p class="yuan">原价：￥{{combo.original_price|toFixed2}}</p>
          <p class="youhui">优惠价：￥{{combo.actual_price|toFixed2}}</p>
        </div>
        <div class="rightpart">
          <span class="del bt" @click="delPop">删除</span>
          <span v-if="combo.enabled" class="down bt" @click="opWays">下架</span>
          <span v-else class="down bt" @click="opWays">上架</span>
          <span @click="editItem" class="edit bt">编辑</span>
        </div>
      </div>
      <van-overlay :show="overlay">
        <div class="overlay">
          <van-loading />
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import { cacheMixins } from "@/libs/mixins";
import { getPackageDetail, modiCombo, deleCombo } from "@/api/combo";
export default {
  name: "comboDetail",
  mixins: [cacheMixins],
  data() {
    return {
      overlay: false, // 加载中
      showDel: false, // 删除
      showLoading: true,
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
    // 套餐
    combo() {
      return this.$store.state.combo.comboItem;
    }
  },
  methods: {
    // 上下架
    opWays() {
      this.overlay = true;
      this.modiComboFunction();
    },
    // 修改相关
    modiComboFunction() {
      modiCombo(
        {
          ktv_id: this.$store.state.user.ktv_id,
          pk: this.$store.state.combo.comboItem.id
        },
        {
          enabled: !this.combo.enabled
        }
      ).then(res => {
        if (res.status < 400) {
          this.$toast({
            message: this.$store.state.combo.comboItem.enabled
              ? "套餐已下架"
              : "套餐已上架",
            type: "success"
          });
          getPackageDetail(
            this.$store.state.user.ktv_id,
            this.$store.state.combo.comboItem.id
          ).then(r => {
            if (r.status < 400) {
              this.$store.commit("set_comboItemAttr", {
                attr: "enabled",
                val: !this.combo.enabled
              });
              this.$store.commit("set_comboItemAttr", {
                attr: "goods",
                val: r.data.goods
              });
              this.overlay = false;
            }
          });
        }
      });
    },
    // 修改
    editItem() {
      this.$router.push({
        name: "newcombo",
        query: {
          c: false
        }
      });
    },
    // 删除确认
    delPop() {
      let _this = this;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除该套餐吗？",
          beforeClose
        })
        .catch(e => {
          // console.log(e);
        });
      function beforeClose(action, done) {
        if (action === "confirm") {
          deleCombo(
            _this.$store.state.user.ktv_id,
            _this.$store.state.combo.comboItem.id
          ).then(res => {
            if (res.status < 400) {
              _this.$toast({
                message: "套餐删除成功",
                type: "success"
              });
              done();
              _this.$router.push({
                name: "roomPackage"
              });
            }
          });
        } else {
          done();
        }
      }
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
.noneInfo {
  text-align: center;
  color: #afacac;
  margin-top: 10%;
}
.comboDetail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  background-color: #f5f6f5;
  .title-wrapper {
    margin: 10px 0;
    padding: 15px;
    background-color: #fff;
    .left {
      .name {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
        margin-right: 15px;
      }
      .status {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .combo-detail-cont {
    padding: 15px;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .detailcont {
      background: rgba(248, 248, 248, 1);
      display: flex;
      justify-content: space-around;
      padding: 15px 0;
      margin: 10px 0;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
      }
    }
  }
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 57px;
    background-color: #fff;
    padding: 7px 15px 7px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftpart {
      .yuan {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
      .youhui {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(254, 96, 66, 1);
        line-height: 20px;
      }
    }
    .rightpart {
      .bt {
        display: inline-block;
        width: 44px;
        line-height: 20px;
        border-radius: 4px;
        text-align: center;
        margin-left: 20px;
      }
      .del {
        border: 1px solid rgba(255, 85, 98, 1);
        color: rgba(255, 85, 98, 1);
      }
      .down {
        border: 1px solid #00cda2;
        color: #00cda2;
      }
      .edit {
        border: 1px solid #0096f7;
        color: #0096f7;
      }
    }
  }
}
</style>