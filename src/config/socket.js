<<<<<<< HEAD
import {
  socket
}
from "@/api/information";
import { wsk } from "@/libs/api.request.js";
=======
import config from "@/config";
>>>>>>> 600d22ce886443a97dae6a098220a94eb9e8422c
import Centrifuge from "centrifuge";
let socketIns = null;
export default {
  /**
   * 
   * @param {socket接口} api 
   * @param {socket接口参数} params 
   * @param {执行回调} cb 
   * @param {签名参数} key 
   */
  getWebSocket(api, params, cb, obj) {
    if ("WebSocket" in window && !self.connectStatus) {
      api(params).then(res => {
        const sign = res.data.access_token; // 签名： 后端根据secret、user、timestamp等，通过hashmap、二进制流、sha256换算得到
        const timestamp = res.data.timestamp; // 时间戳
        const user = res.data.user; // 当前登录用户id
        if (user) return
        socketIns = new Centrifuge({
          url: wsk,
          user: user,
          timestamp: timestamp,
          token: sign
        });
        console.log(socketIns);

        // 与Websocket端点建立连接,并通过签名授权
        socketIns.connect();
        // 监听msg:userid 是否有未读新消息
        socketIns.subscribe(
          // `msg:${self.$store.state.user.userID}`,
          `{obj.key}:${obj.val}`,
          message => {
            /**
             * userID 用户 的实时系统消息
             * @message {object}: 消息内容（登录提醒、修改密码提醒等）
             */
            cb();
          }
        );

        socketIns.on("connect", context => {
          // console.log("连接成功", context);
        });

        socketIns.on("disconnect", context => {
          // console.log("断开连接", context);
        });

        socketIns.on("error", error => {
          // console.log("错误连接", error);
        });

        // 监听窗口关闭事件，主动关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = () => {
          socketIns.disconnect();
        };
      });
      return socketIns
    }
    return socketIns
  },
  closeWs() {
    if (socketIns) {
      socketIns.disconnect();
    }
  }
}
