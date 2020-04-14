<template>
  <div class="manaCombo">
    <div class="common">
      <p>已上架商品</p>
      <div class="wrapper">
        <div class="cont">
          <div class="index">1</div>
          <div class="cont-cont">
            <p class="name">套餐名称A</p>
            <p class="price">
              <span class="s1">￥60.00</span>
              <span class="s2">￥100.00</span>
            </p>
          </div>
        </div>
        <div class="op">
          <span class="op-s op1">上移</span>
          <span class="op-s op2">置顶</span>
          <span class="op-s op3">下架</span>
        </div>
        <img class="cancelImg" width="15" height="15" :src="cancelImg" alt />
      </div>
    </div>
    <div class="common">
      <p>已下架商品</p>
      <div class="wrapper">
        <div class="cont">
          <div class="index">2</div>
          <div class="cont-cont">
            <p class="name">套餐名称B</p>
            <p class="price">
              <span class="s1">￥60.00</span>
              <span class="s2">￥100.00</span>
            </p>
          </div>
        </div>
        <div class="op">
          <span class="op-s op1">上架</span>
        </div>
        <img class="cancelImg" width="15" height="15" :src="cancelImg" alt />
      </div>
    </div>
    <div class="bottom">
      <div @click="cancle" class="btn cancle">取消</div>
      <div class="btn save">保存</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cancelImg: require("@/assets/comboCancel.png")
    };
  },
  methods: {
    // 取消
    cancle() {
      this.$router.push({
        name: "combo"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.manaCombo {
  padding-bottom: 45px;
  .common {
    padding: 22px 35px 22px 15px;
    background-color: #fff;
    margin-bottom: 10px;
    .wrapper {
      position: relative;
      border-radius: 12px;
      box-shadow: 1px 4px 5px 0px #eae8e8;
      margin-bottom: 10px;
      padding: 17px 17px 0 17px;
      .cont {
        border-bottom: 1px solid #eeeeee;
        display: flex;
        padding: 17px 0;
        align-items: center;
        .index {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #0495f5;
          color: #fff;
          font-size: 8px;
          line-height: 16px;
          text-align: center;
        }
        .cont-cont {
          margin-left: 10px;
          flex: 1;
          .name {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 10px;
          }
          .price {
            .s1 {
              margin-right: 25px;
              color: #fe6042;
            }
            .s2 {
              margin-right: 25px;
              color: #999999;
              text-decoration: line-through;
            }
          }
        }
      }
      .op {
        padding: 7px 0;
        .op-s {
          display: inline-block;
          border-radius: 4px;
          padding: 4px 10px;
        }
        .op1 {
          border: 1px solid rgba(0, 150, 247, 1);
          color: rgba(0, 150, 247, 1);
          margin-right: 10px;
        }
        .op2 {
          border: 1px solid #00cda2;
          color: #00cda2;
          margin-right: 10px;
        }
        .op3 {
          border: 1px solid #ff5562;
          color: #ff5562;
        }
      }
      .cancelImg {
        position: absolute;
        top: 45%;
        right: -8%;
      }
    }
  }
  .bottom {
    height: 44px;
    line-height: 44px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.16);
    .btn {
      flex: 1;
      text-align: center;
    }
    .save {
      background: rgba(0, 130, 255, 1);
      color: #fff;
    }
    .cancle {
    }
  }
}
</style>