<template>
  <div class="homeBox">
    <div class="routerView theme">
      <keep-alive :include="keepAliveList">
        <router-view></router-view>
      </keep-alive>
    </div>
    <BottomBar v-show="showTab" @goView="goView" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BottomBar from "./components/bottomTabbar";
export default {
  components: {
    BottomBar
  },
  computed: {
    keepAliveList() {
      return this.$store.state.app.keepAliveList;
    },
    showTab() {
      if (this.$route.meta && this.$route.meta.showBottomTab) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      timer: null
    };
  },
  watch: {
    $route(newVal) {
      document.title = newVal.meta.title;
    }
  },
  methods: {
    ...mapActions(["getUnRead"]),
    goView(pageName) {
      this.$router.push({
        name: pageName
      });
    }
  },
  created() {
    this.getUnRead();
    this.timer = setInterval(() => {
      this.getUnRead();
    }, 20000);
    this.$store.commit("SET_THEME", this.$store.state.user.usertype);
  },
  mounted() {
    let body = document.getElementsByTagName("body")[0];
    body.className = this.$store.state.app.className;
  },
  destroyed() {
    clearInterval(this.timer);
    let body = document.getElementsByTagName("body")[0];
    body.className = "themea";
  }
};
</script>
<style lang="less">
@import "../../static/style/theme.less";
.themea {
  .theme(); //默认的样式
}
.themeb {
  .theme(
    #2accdd,
    linear-gradient(
      180deg,
      rgba(24, 223, 208, 1) 0%,
      rgba(29, 180, 213, 1) 100%
    ),
    url("../../assets/banner2.png")
  );
}
</style>
<style scoped="scoped" lang="less">
.homeBox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f6f6f6;
  .routerView {
    flex: 1;
    overflow: auto;
  }
}
</style>
