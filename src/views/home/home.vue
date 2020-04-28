<template>
  <div class="homeBox">
    <div class="routerView theme">
      <transition :name="transitionName">
        <keep-alive :include="keepAliveList">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <BottomBar v-show="showTab" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BottomBar from "./components/bottomTabbar";
import { websocket } from "@/config/webSocket";
import { getOrderList } from "@/api/ktvClerkOrder.js";
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
      transitionName: "slide-none",
      socketConent: null
    };
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title;
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (toDepth == fromDepth) {
        this.transitionName = "slide-none";
      } else if (toDepth < fromDepth) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  },
  methods: {
    ...mapActions(["getUnRead"])
  },
  created() {
    this.$store.commit("SET_THEME", this.$store.state.user.usertype);
  },
  mounted() {
    let body = document.getElementsByTagName("body")[0];
    body.className = this.$store.state.app.className;
    // 设置websocket,
    let ktv_id = this.$store.state.user.ktv_id;
    let userID = this.$store.state.user.userID;
    let usertype = this.$store.state.user.usertype;
    websocket().then(content => {
      this.socketConent = content;
      if (usertype == "ktv_clerk") {
        content.addListeners(`package:${ktv_id}`, res => {
          let send_data = {
            ktv_id_list: ktv_id,
            package_status: 2
          };
          getOrderList(send_data).then(res => {
            this.$store.commit("setUndelivered", res.data.count);
          });
        });
        return;
      }
      this.getUnRead();
      content.addListeners(`msg:${userID}`, r => {
        this.getUnRead();
      });
    });
  },
  destroyed() {
    let body = document.getElementsByTagName("body")[0];
    body.className = "themea";
    if (this.socketConent != null) {
      this.socketConent.disconnect();
    }
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
.slide-none-enter-active,
.slide-none-enter-active {
  transition: opacity 0.01s ease-out;
}
.slide-none-enter {
  opacity: 0;
}

.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-right-enter {
  transform: translate(-100%, 0);
}
</style>
