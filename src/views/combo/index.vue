<template>
  <div class="combo">
    <div class="combo-top">
      <span class="combo-top-title">套餐列表（5/10）</span>
      <div class="combo-top-op">
        <button class="op-btn op-btn-man" @click="manaCombo">管理</button>
        <button class="op-btn op-btn-new" @click="newCombo">创建</button>
      </div>
    </div>
    <div class="combo-ul">
      <li>
        <img style="display:none;" width="40" height="40" class="leftimg" :src="listImg" alt />
        <div class="combo-ul-content">
          <div class="combo-ul-content-p1">
            <span class="p1-name">套餐A</span>
            <!-- <img class="tip" width="31" height="16" :src="recommendImg" alt /> -->
            <div class="tip1">已下架</div>
          </div>
          <p class="combo-ul-content-p2">
            <span class="p2-1">￥90.00</span>
            <b class="p2-2">￥100.00</b>
          </p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      total: 0,
      listImg: require("@/assets/alipay.png"),
      recommendImg: require("@/assets/backicon.png")
    };
  },
  methods: {
    manaCombo() {
      this.$router.push({
        name: "manaCombo"
      });
    },
    newCombo() {
      this.$router.push({
        name: "newcombo"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.combo {
  padding: 10px 20px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 60px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  .combo-top {
    width: 100%;
    height: 40px;
    padding: 12px 15px;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .combo-top-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);
    }
    .combo-top-op {
      .op-btn {
        width: 44px;
        border-radius: 4px;
        height: 24px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        border: none;
      }
      .op-btn-man {
        border: 1px solid rgba(0, 150, 247, 1);
        background-color: #fff;
        color: rgba(0, 150, 247, 1);
        margin-right: 20px;
      }
      .op-btn-new {
        background: linear-gradient(
          180deg,
          rgba(54, 210, 254, 1) 0%,
          rgba(0, 130, 255, 1) 100%
        );
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .combo-ul {
    overflow-y: auto;
    flex: 1;
    li {
      border-radius: 12px;
      box-shadow: 0px 5px 5px 0px #eae8e8;
      margin-bottom: 10px;
      padding: 17px;
      list-style: none;
      display: flex;
      align-items: center;
      background-color: #fff;
      .leftimg {
        margin-right: 20px;
      }
      .combo-ul-content {
        flex: 1;
        .combo-ul-content-p1 {
          position: relative;
          margin-bottom: 10px;
          .p1-name {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
          .tip {
            position: absolute;
            right: 0;
            top: -17px;
          }
          .tip1 {
            position: absolute;
            right: 0;
            top: -5px;
            font-size: 12px;
            color: #d4d4d4;
            padding: 3px 8px;
            border-radius: 12px;
            background-color: #f4f4f4;
          }
        }
        .combo-ul-content-p2 {
          margin-top: 15px;
          .p2-1 {
            margin-right: 25px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(254, 96, 66, 1);
          }
          .p2-2 {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>