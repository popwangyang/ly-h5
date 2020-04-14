<template>
  <div class="tabBarBox">
    <van-tabbar route :active-color="activeColor" inactive-color="#B7B7B7">
      <van-tabbar-item
        :info="item.info ? item.info:''"
        v-for="(item, index) in dataList"
        :key="index"
        :to="item.path"
      >
        <span class="bottonTabText">{{item.text}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    dataList() {
      return this.$store.state.app.theme.tabBottoms;
    },
    activeColor() {
      return this.$store.state.app.theme.color;
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.tabBarBox {
  height: 50px;
  .bottonTabText {
    display: block;
    transform: scale(0.75);
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
  }
}
</style>
