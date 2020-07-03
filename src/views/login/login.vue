<template>
  <div class="loginBox" v-if="!isforgetPassword">
    <span class="title">
      <img :src="logoURL" />
    </span>
    <span class="body">
      <span class="top">
        <span class="topLeft">
          <span class="text">账号登录</span>
        </span>
      </span>
      <span class="left"></span>
      <span class="right"></span>
      <span class="input" style="margin-top: 3rem;">
        <van-field
          clearable
          v-model="username"
          placeholder="请输入邮箱号/手机号/ID"
          input-align="left"
          style="background: none;"
        />
      </span>
      <span class="input">
        <van-field
          v-model="password"
          :type="inputType"
          placeholder="请输入密码"
          input-align="left"
          :right-icon="rightIcon"
          @click-right-icon="rightIconBtn"
          style="background: none;"
        />
      </span>
      <span class="input" style="border: none;">
        <van-button
          type="info"
          size="large"
          loading-text="登录中..."
          loading-type="spinner"
          :loading="loading"
          :disabled="disabled"
          @click="signIn"
          >登录</van-button
        >
      </span>
      <span class="bodyFooter" style="color: #2266F6;" @click="forgetPassword"
        >忘记密码</span
      >
    </span>
    <span class="loginFooter"></span>
  </div>
  <div v-else style="height: 100%;">
    <ForgetPassword @event="forgetPassword" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ForgetPassword from "./components/forgetPassword";
import "./login.less";
export default {
  components: { ForgetPassword },
  data() {
    return {
      username: "", // admin@hlchang.cn
      password: "", // abc12345
      passwordFlag: false,
      loading: false,
      isforgetPassword: false,
      logoURL: require("@/assets/logo.png")
    };
  },
  computed: {
    rightIcon() {
      return this.passwordFlag ? "eye-o" : "closed-eye";
    },
    inputType() {
      return this.passwordFlag ? "text" : "password";
    },
    disabled() {
      if (this.username != "" && this.password != "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["getLogin", "getUnRead", "setPersonInfo"]),
    forgetPassword() {
      this.$store.commit("setforgetPasswordKey", "phone");
      this.isforgetPassword = !this.isforgetPassword;
    },
    signIn() {
      let send_data = {
        username: this.username,
        password: this.password
      };

      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        overlay: true,
        loadingType: "circular",
        className: "loadClass",
        message: "登录中..."
      });
      this.getLogin(send_data)
        .then(res => {
          if (res.data.data[0].belong_participant) {
            if (
              res.data.data[0].belong_participant.participant_type === "ktv" ||
              res.data.data[0].belong_participant.participant_type ===
                "ktv_clerk"
            ) {
              this.$store.commit(
                "setKtvID",
                res.data.data[0].belong_participant.ktv_id
              );
            }
          }
          this.setPersonInfo();
          this.$toast.success({
            duration: 1000, // 持续展示 toast
            forbidClick: true,
            overlay: true,
            className: "loadClass",
            message: "登录成功",
            onClose: () => {
              let path = this.$store.state.app.theme.tabBottoms[0].path;
              this.$router.push({
                path: path
              });
            }
          });
          localStorage.setItem("ylH5", JSON.stringify(send_data));
        })
        .catch(err => {
          console.log(err.status);
          let message = "登录失败";
          if (err.status == 200) {
            message = err.data.codemsg;
          }
          this.$toast.fail({
            duration: 2500, // 持续展示 toast
            forbidClick: true,
            overlay: true,
            className: "loadClass",
            message: message
          });
        });
    },
    rightIconBtn() {
      this.passwordFlag = !this.passwordFlag;
    },
    init() {
      if (localStorage.getItem("ylH5")) {
        const { username, password } = JSON.parse(localStorage.getItem("ylH5"));
        this.username = username;
        this.password = password;
      }
    }
  },
  mounted() {
    console.log(window.$config.baseUrl);
    var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
    window.onload = function() {
      //在页面整体加载完毕时
      document.getElementById("app").style.height = hrt + "px"; //把获取到的高度赋值给根div
    };
    document.title = "联娱大数据";
    this.init();
  }
};
</script>
<style lang="less">
.loadClass {
  background: white;
  .van-icon {
    color: #1989fa;
  }
  .van-loading {
    color: #1989fa;
  }
  .van-toast__text {
    color: #1989fa;
  }
}
</style>
