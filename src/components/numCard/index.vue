<template>
  <div class="num-card">
    <p class="card-num">{{num}}</p>
    <p class="card-title">{{label}}</p>
    <img class="card-icon" :src="icon" width="32" height="31" alt />
  </div>
</template>

<script>
export default {
  props: {
    //右下角图标
    icon: {
      type: String,
      required: true
    },
    //数量
    num: {
      type: Number,
      required: true
    },
    //名称
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.num-card {
  width: 48%;
  height: 76px;
  position: relative;
  margin-top: 20.5px;
  padding: 14px 13px;
  box-shadow: 0px 4px 10px 0px rgba(159, 159, 159, 0.33);
  border-radius: 8px;
  .card-num {
    font-size: 20px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    height: 27px;
  }
  .card-title {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 17px;
    height: 17px;
  }
  .card-icon {
    position: absolute;
    bottom: 0;
    right: 12.28px;
  }
}
</style>