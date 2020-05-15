<template>
  <div class="personalCenter" ref="scroll">
    <div v-if="showPersonalInfo!==2" class="head-wrapper changeBanner">
      <div class="mid-wrapper">
        <p class="nameLabel">{{comname}}</p>
        <p class="areaLabel">{{address}}</p>
        <van-button
          v-if="showPersonalInfo===1"
          class="buttonSquare btntop"
          type="default"
        >包厢数：{{roomnum}}</van-button>
      </div>
    </div>
    <div v-if="showPersonalInfo===2" class="mana-wrapper">{{name}}</div>
    <div v-if="showPersonalInfo===2" class="content-wrapper" style="margin-bottom:5px">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">所属公司</span>
              <span class="titletext">{{comname}}</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">手机号</span>
              <span class="titletext">{{phone}}</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">邮箱</span>
              <span class="titletext">{{email}}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="content-wrapper">
      <van-cell-group v-if="showPersonalInfo!==2">
        <van-cell v-if="showPersonalInfo === 3">
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">VOD品牌</span>
              <span class="titletext">{{brand}}</span>
            </div>
          </template>
        </van-cell>
        <van-cell v-if="showPersonalInfo === 1">
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">营业时间</span>
              <span class="titletext workday">{{business_periods}}</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">联系方式</span>
              <span class="titletext">{{name? `${name}，`:''}}{{phone||''}}</span>
            </div>
          </template>
        </van-cell>
        <van-cell v-if="showPersonalInfo===1">
          <template slot="title">
            <div class="flexcolumn">
              <span class="titlestyle">设备信息</span>
              <span class="titletext">{{deviceInfo}}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell class="b45 info-mid icon-wrapper" is-link to="personalInfo">
          <template slot="title">
            <img :src="infoIcon" alt width="14" height="12" />
            <span class="custom-title">消息中心</span>
            <span v-if="count" class="count">{{count|countMax}}</span>
          </template>
        </van-cell>

        <van-cell
          v-if="showPersonalInfo === 2 && isHasWithdrawal"
          class="b45 info-mid icon-wrapper"
          is-link
          to="withdrawalMain"
        >
          <template slot="title">
            <img :src="infoWidIcon" alt width="15" height="12" />
            <span class="custom-title">账户提现</span>
          </template>
        </van-cell>

        <van-cell
          v-if="showPersonalInfo === 1 && !ktv_clerkShow"
          class="icon-wrapper"
          is-link
          to="personContract"
        >
          <template slot="title">
            <img :src="contractIcon" alt width="12" height="14" />
            <span class="custom-title">合同信息</span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell class="icon-wrapper" is-link to="changePassword">
          <template slot="title">
            <img :src="changeSecIcon" alt width="12" height="15" />
            <span class="custom-title">修改密码</span>
          </template>
        </van-cell>

        <van-cell class="icon-wrapper" @click="_loginOut" is-link>
          <template slot="title">
            <img :src="loginoutIcon" alt width="12" height="16" />
            <span class="custom-title">退出登录</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { filterArea } from "@/libs/util";
import { mapActions } from "vuex";
import { Dialog } from "vant";
import {
  getPersonMidInfo,
  getKTVPersonMidInfo,
  getVodPersonMidInfo
} from "@/api/user";

export default {
  name: "personalCenter",
  data() {
    return {
      resData: {}, // ktv信息
      deviceInfo: "", //设备信息
      ssq: "", //省市区
      business_periods: "", // 营业时间
      brand: "", //vod
      comname: "", // 机构名称
      detailAddress: "", // 机构地址
      name: "", // 联系人
      phone: "", // 联系方式
      email: "", //邮箱
      roomnum: 0, // 包厢数
      infoIcon: require("../../assets/infonum.png"),
      infoWidIcon: require("../../assets/width.png"),
      changeSecIcon: require("../../assets/serc.png"),
      loginoutIcon: require("../../assets/backicon.png"),
      contractIcon: require("../../assets/hetong.png")
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    ...mapActions(["loginOut"]),
    // 获取登录信息
    getInfo() {
      let str = "";
      if (this.usertype === "ktv" || this.usertype === "ktv_clerk") {
        getKTVPersonMidInfo(this.ktv_id).then(res => {
          if (res.status >= 200 && res.status < 400 && res.data) {
            this.resData = res.data;
            let tempStr =
              this.resData.business_periods === null
                ? ""
                : this.resData.business_periods;
            if (this.resData.business_workdays) {
              this.resData.business_workdays
                .split("")
                .forEach((item, index) => {
                  if (index === this.resData.business_workdays.length - 1) {
                    if (!tempStr) {
                      str += `${this.handleWorkDay(item)}；全天`;
                    } else {
                      str += `${this.handleWorkDay(item)}；`;
                    }
                  } else {
                    str += `${this.handleWorkDay(item)}、`;
                  }
                });
            }
            this.business_periods = str + tempStr;
            this.comname = this.resData.ktv_name;
            this.roomnum = this.resData.room_num;
            this.name = this.resData.contact_username;
            this.phone = this.resData.contact_phone;
            this.detailAddress = this.resData.address;
            this.ssq =
              this.resData.province +
              " " +
              this.resData.city +
              " " +
              this.resData.county;
            this.deviceInfo = `${
              this.resData.vod_ktv_id ? this.resData.vod_ktv_id + "，" : ""
            }${this.resData.vod_brand ? this.resData.vod_brand : ""}`;
          }
        });
        return;
      }
      getPersonMidInfo().then(res => {
        if (res.status >= 200 && res.status < 400 && res.data) {
          if (this.usertype === "employee") {
            let result1 = res.data;
            this.email = result1.email;
            this.name = result1.nickname;
            this.phone = result1.phone;
            this.comname = "联娱";
          }
          if (res.data.belong_participant) {
            let result1 = res.data.belong_participant;
            if (this.showPersonalInfo === 3) {
              getVodPersonMidInfo(result1.id).then(vodres => {
                if (vodres.data) this.brand = vodres.data.brand;
              });
            }
            if (this.showPersonalInfo === 4) {
              this.comname = result1.name;
              this.detailAddress = result1.address;
              this.ssq = filterArea(result1.area_code_list);
              this.name = result1.contact;
              this.phone = result1.telephone;
              return;
            }
            let result2 = res.data;
            this.comname = result1.name;
            this.email = res.data.email;
            this.detailAddress = result1.address;
            this.ssq = filterArea(result1.area_code_list);
            this.name = result2.nickname;
            this.phone = result2.phone;
          }
        }
      });
    },

    // 处理工作日
    handleWorkDay(item) {
      let str = "";
      switch (item) {
        case "1":
          str = "星期一";
          break;
        case "2":
          str = "星期二";
          break;
        case "3":
          str = "星期三";
          break;
        case "4":
          str = "星期四";
          break;
        case "5":
          str = "星期五";
          break;
        case "6":
          str = "星期六";
          break;
        case "7":
          str = "星期日";
          break;

        default:
          break;
      }
      return str;
    },

    // 登出
    _loginOut() {
      Dialog.confirm({
        title: "提示",
        message: "确定退出？",
        confirmButtonColor:
          this.$store.state.app.className === "themea" ? "#0082FF" : "#2accdd"
      })
        .then(() => {
          this.loginOut().then(() => {
            this.$router.push({
              path: "/login"
            });
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    address() {
      return this.ssq + " " + this.detailAddress;
    },
    isHasWithdrawal() {
      return this.$store.state.user.isHasWithdrawal;
    },
    count() {
      return this.$store.state.app.unreadNum;
    },
    usertype() {
      return this.$store.state.user.usertype;
    },

    userid() {
      return this.$store.state.user.userID;
    },

    ktv_id() {
      return this.$store.state.user.ktv_id;
    },
    ktv_clerkShow() {
      return this.$store.state.user.usertype === "ktv_clerk";
    },
    showPersonalInfo() {
      let infoType;
      switch (this.$store.state.user.usertype) {
        case "ktv":
        case "ktv_clerk":
          infoType = 1;
          break;
        case "platform":
        case "agentibus":
        case "employee":
          infoType = 2;
          break;
        case "vod":
          infoType = 3;
          break;
        case "industry_association":
        case "advance_party":
        case "music_copyright_society":
        case "copyright_party":
          infoType = 4;
          break;
        default:
          infoType = 0;
      }
      return infoType;
    }
  },
  filters: {
    countMax: val => {
      if (val > 99) return "99+";
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../static/style/mixin.scss";

.personalCenter {
  width: 100%;
  min-height: 100%;
  background-color: #fafafa;
  .head-wrapper {
    position: relative;
    background-color: #fff;
    height: 160px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    .mid-wrapper {
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 36px;
      height: 111px;
      width: 90%;
      left: 5%;
      margin: 0 auto;
      background-image: url("../../assets/midbannerp.png");
      background-position: bottom center;
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-color: #fff;
      justify-content: center;
      .nameLabel {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(68, 68, 68, 1);
        line-height: 22px;
      }
      .areaLabel {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(134, 146, 165, 1);
        line-height: 17px;
        margin-top: 7px;
      }
      .btntop {
        margin-top: 2px !important;
        font-size: 14px !important;
        font-family: PingFangSC-Regular, PingFang SC !important;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px !important;
      }
    }
  }
  .mana-wrapper {
    background-image: url("../../assets/manabanner.png");
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 70px;
    padding-left: 15px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 70px;
    margin-bottom: 10px;
  }

  .content-wrapper {
    .count {
      margin-left: 10px;
      display: inline-block;
      padding: 2px 6px;
      background-color: rgba(246, 59, 82, 1);
      color: #fff;
      border-radius: 8px;
      line-height: 11px;
      vertical-align: middle;
      font-size: 8px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
    }
  }
}

.b45 {
  margin-bottom: 5px;
}
</style>
<style>
.personalCenter .van-cell-group {
  margin-top: 5px;
}
.personalCenter .van-cell-group:first-child {
  margin-top: 0px;
}

.personalCenter .flexcolumn {
  display: flex;
  flex-direction: column;
}
.personalCenter .icon-wrapper .van-cell__title {
  display: flex;
  align-items: center;
}
.personalCenter .icon-wrapper img {
  margin-right: 10px;
}

.personalCenter .titletext {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #444;
  line-height: 20px;
  height: 20px;
  margin-top: 7px;
}
.personalCenter .titlestyle {
  color: #a7a7a7;
  vertical-align: middle;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 14px;
}
.personalCenter .custom-title {
  color: #666;
}
.personalCenter .workday {
  line-height: 20px !important;
  height: 36px !important;
}
</style>
