<template>
  <div class="setNewBox">
    <h2>更改密码</h2>
    <div class="item">
      <h4>原始密码</h4>
      <div>
        <van-field
          clearable
          type="password"
          v-model="formData.password"
          left
          placeholder="请输入原始密码"
        />
      </div>
    </div>
    <div class="item">
      <h4>新密码</h4>
      <div>
        <van-field
          clearable
          type="password"
          v-model="formData.password1"
          left
          placeholder="请输入新密码"
        />
      </div>
    </div>
    <div class="item">
      <h4>确认密码</h4>
      <div>
        <van-field
          clearable
          type="password"
          v-model="formData.password2"
          left
          placeholder="请再次输入密码"
        />
      </div>
    </div>
    <div class="footer">
      <van-button
        :disabled="isDisButton"
        style="border: none;"
        :class="isDisButton?'entityDisBtnDefault':'entityBtnDefault'"
        type="info"
        size="large"
        @click="handleFrom"
        :loading="loading"
      >完成</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import formValidate from "@/libs/validator";
import { changePasswordapi } from "@/api/user.js";
export default {
  data() {
    const validatePassword = value => {
      var myrey = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (value == "") {
        return "原始密码不能为空";
      } else if (!myrey.test(value)) {
        return "请输入6~20位数字和字母组合";
      }
    };
    const validatePassword1 = value => {
      var myrey = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (value == "") {
        return "密码不能为空";
      } else if (!myrey.test(value)) {
        return "请输入6~20位数字和字母组合";
      }
    };
    const validatePassword2 = (value, data) => {
      if (value == "") {
        return "请再次输入密码";
      } else if (value != data.password1) {
        return "两次输入密码不一致";
      }
    };
    return {
      loading: false,
      formData: {
        password: "",
        password1: "",
        password2: ""
      },
      rules: {
        password: [{ required: true, validate: validatePassword }],
        password1: [{ required: true, validate: validatePassword1 }],
        password2: [{ required: true, validate: validatePassword2 }]
      }
    };
  },
  methods: {
    ...mapActions(["loginOut"]),
    handleFrom() {
      formValidate(this.formData, this.rules).then(val => {
        if (val) {
          const password = this.formData.password;
          const password1 = this.formData.password1;
          const username = this.username;
          this.loading = true;
          changePasswordapi(username, password1, password)
            .then(() => {
              this.loading = false;
              Toast.success("密码修改成功");
              this.loginOut().then(() => {
                this.$router.push({
                  path: "/login"
                });
              });
            })
            .catch(err => {
              this.$toast(err.data.error);
              this.loading = false;
            });
        }
      });
    }
  },
  computed: {
    username() {
      return this.$store.state.user.userEmail;
    },
    isDisButton() {
      return (
        this.formData.password == "" ||
        this.formData.password1 == "" ||
        this.formData.password2 == ""
      );
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.setNewBox {
  display: block;
  height: 100%;
  width: 100%;
  background: #ffffff;
  padding: 25.35px 9.75px;
  box-sizing: border-box;
  .item {
    & > div {
      border-bottom: 1px solid #c6cbd4;
      margin-bottom: 11.25px;
      .code {
        font-size: 12px;
        font-weight: 500;
        color: rgba(75, 116, 255, 1);
      }
    }
    .loading {
      width: 100%;
      height: 22.5px;
      display: flex;
      align-items: center;
    }
  }
  .footer {
    margin-top: 37.5px;
    display: block;
  }
}
h2,
h4 {
  margin: 0;
  padding: 0;
}
h2 {
  font-size: 20px;
  font-weight: 500;
  color: #020202;
  margin-bottom: 19.5px;
}
h4 {
  font-size: 12px;
  font-weight: 400;
  color: rgba(108, 114, 124, 1);
  margin-bottom: 9.75px;
}
</style>
