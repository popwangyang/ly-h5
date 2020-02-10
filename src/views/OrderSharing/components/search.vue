<template>
  <div class="searchBox">
    <van-search :placeholder="placeholder" v-model="value" shape="round" />
    <div @click="Btn" class="div"></div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    hasPay: {
      type: Boolean
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    Btn() {
      this.$router.push({
        name: "searchOrderPage",
        query: {
          type: "order",
          hasPay: this.showOrder !== 3
        }
      });
    }
  },
  computed: {
    // 是否显示支付方式
    showOrder() {
      let infoType;
      switch (this.$store.state.user.usertype) {
        case "ktv":
        case "copyright_party":
          infoType = 1;
          break;
        case "platform":
        case "agentibus":
        case "employee":
          infoType = 2;
          break;
        case "industry_association":
        case "advance_party":
        case "vod":
          infoType = 3;
          break;
        default:
          infoType = 0;
      }
      return infoType;
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.searchBox {
  position: relative;
  .div {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
