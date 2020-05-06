import {
  login,
  getEmployee_user_id
}
from '@/api/user'

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
    isHasWithdrawal: true, // 是否有提现资格
    user_id: '', // usertype +id
    ktv_id: '', // ktv角色的专属Id
    forgetPasswordKey: 'phone', // phone 为手机验证，email 为邮箱验证
    area: {}, // 用户所属地区
  },
  mutations: {
    set_hasWithdrawal(state, isHasWithdrawal) {
      state.isHasWithdrawal = isHasWithdrawal;
    },
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
    setUserArea(state, data) {
      state.area = data;
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

            if (res.data.data[0].actions && res.data.data[0].actions.indexOf('withdrawal_operation') > -1) {
              commit('set_hasWithdrawal', true);
            } else {
              commit('set_hasWithdrawal', false);
            }
            commit("SET_THEME", res.data.data[0].user_type);
            commit('setUserType', res.data.data[0].user_type);
            commit('setUserName', res.data.data[0].username);
            commit('setUserID', res.data.data[0].user);
            commit('setUserEmail', res.data.data[0].email);
            commit('setUserArea', res.data.data[0].areas[0] || {
              name: '全国',
              number: ''
            });
            if (res.data.data[0].belong_participant) {
              commit('setUser_id', res.data.data[0].belong_participant.unique_key || '');
              if (res.data.data[0].belong_participant.participant_type === 'ktv') {
                commit('setKTVId', res.data.data[0].belong_participant.ktv_id);
              }
            } else {
              getEmployee_user_id().then(resid => {
                if (resid.data.participant_type === "platform") {
                  commit('setUser_id', resid.data.unique_key);
                }
              })
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
      return new Promise((resolve) => {
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
