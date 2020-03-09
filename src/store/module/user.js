import {
  login
}
from '@/api/user'

import socket from '@/config/socket.js'

import {
  setToken,
  validPlatform,
} from '@/libs/util'
export default {
  state: {
    usertype: '',
    username: '',
    userID: '',
    userEmail: '',
    user_id: '', // usertype +id
    ktv_id: '', // ktv角色的专属Id
    forgetPasswordKey: 'phone', // phone 为手机验证，email 为邮箱验证
  },
  mutations: {
    setKTVId(state, ktv_id) {
      state.ktv_id = ktv_id;
    },
    setUserType(state, user_type) {
      state.usertype = user_type;
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
    setUserName(state, username) {
      state.username = username;
    },
    setUserID(state, id) {
      state.userID = id;
    },
    setforgetPasswordKey(state, key) {
      state.forgetPasswordKey = key
    },
    setUser_id(state, user_id) {
      state.user_id = user_id;
    },
  },
  actions: {
    getLogin({
      commit
    }, {
      username,
      password
    }) {
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          if (res.data.code == 0) {
            if (process.env.NODE_ENV === 'production') {
              let data = validPlatform(res.data.data[0].user_type);
              if (!data.flag) {
                let errorData = {
                  status: 200,
                  data: {
                    codemsg: data.msg
                  }
                }
                reject(errorData);
                return
              }
            }
            let token = 'Basic ' + btoa(res.data.data[0].user + ":" + res.data.data[0].token)
            setToken(token);
            commit('setUserType', res.data.data[0].user_type);
            commit('setUserName', res.data.data[0].username);
            commit('setUserID', res.data.data[0].user);
            commit('setUserEmail', res.data.data[0].email);
            if (res.data.data[0].belong_participant) {
              commit('setUser_id', res.data.data[0].belong_participant.unique_key || '');
              if (res.data.data[0].belong_participant.participant_type === 'ktv') {
                commit('setKTVId', res.data.data[0].belong_participant.ktv_id);
              }
            }
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    loginOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        if (socket.getWebSocket()) {
          socket.getWebSocket().disconnect()
        }
        setToken('');
        commit('setUserType', '');
        commit('setUserName', '');
        commit('setUserID', '')
        commit('setUserEmail', '')
        resolve()
      })
    }
  }
}
