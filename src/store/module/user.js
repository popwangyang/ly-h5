import {
  login,
  getPersonMidInfo,
  getEmployee_user_id
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
    financialObj: null, // 资金账户信息 
    isHasWithdrawal: true, // 是否有提现资格
    financialState: false, // 是否有资金账户可提现
    allow_withdraw: false, // 是否允许提现 后台字段
    withdrawalValue: 0, // 可提现金额
    user_id: '', // usertype +id
    ktv_id: '', // ktv角色的专属Id
    forgetPasswordKey: 'phone', // phone 为手机验证，email 为邮箱验证
  },
  mutations: {
    set_withdrawalValue(state, withdrawalValue) {
      state.withdrawalValue = withdrawalValue;
    },
    set_allow_withdraw(state, allow_withdraw) {
      state.allow_withdraw = allow_withdraw;
    },
    set_financialObj(state, financialObj) {
      let obj = {
        bank: financialObj ? financialObj.bank_account_name : "",
        name: financialObj ? financialObj.name : "",
        cardNumber: financialObj ? financialObj.bank_card_number : "",
      }
      state.financialObj = obj;
    },
    set_hasWithdrawal(state, isHasWithdrawal) {
      state.isHasWithdrawal = isHasWithdrawal;
    },
    set_financialState(state, financialState) {
      state.financialState = financialState;
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
            commit('setUserType', res.data.data[0].user_type);
            commit('setUserName', res.data.data[0].username);
            commit('setUserID', res.data.data[0].user);
            commit('setUserEmail', res.data.data[0].email);
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
            getPersonMidInfo().then(resa => {
              if (resa.status >= 200 && resa.status < 400 && resa.data) {
                // if (this.usertype === "employee") {
                // }
                if (resa.data.belong_participant) {
                  let _datas = resa.data.belong_participant
                  if (
                    _datas &&
                    _datas.financial_account &&
                    _datas.financial_account.state === "succeeded"
                  ) {
                    commit("set_financialState", true);
                  } else {
                    commit("set_financialState", false);
                  }

                  if (
                    _datas &&
                    _datas.financial_account
                  ) {
                    commit(
                      "set_financialObj",
                      _datas.financial_account
                    );
                  }

                  if (
                    _datas &&
                    _datas.settlement
                  ) {
                    commit(
                      "set_withdrawalValue",
                      _datas.settlement.withdrawable_balance
                    );
                  }

                  if (
                    _datas &&
                    _datas.financial_account &&
                    _datas.financial_account.allow_withdraw
                  ) {
                    commit("set_allow_withdraw", true);
                  } else {
                    commit("set_allow_withdraw", false);
                  }
                }
              }
            })
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
