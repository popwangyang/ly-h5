import {
  getPersonMidInfo,
  getManaPersonMidInfo,
}
from '@/api/user'

export default {
  state: {
    financialObj: null, // 资金账户信息 
    financialState: false, // 是否有资金账户可提现
    allow_withdraw: false, // 是否允许提现 后台字段
    withdrawalValue: 0, // 可提现金额
  },
  mutations: {
    set_withdrawalValue(state, withdrawalValue) {
      state.withdrawalValue = withdrawalValue;
    },
    set_allow_withdraw(state, allow_withdraw) {
      state.allow_withdraw = allow_withdraw;
    },
    set_financialAccount(state, financialObj) {
      state.financialObj = financialObj;
    },
    set_financialObj(state, financialObj) {
      let obj = {
        bank: financialObj ? financialObj.bank_name : "",
        name: financialObj ? financialObj.name : "",
        cardNumber: financialObj ? financialObj.bank_card_number : "",
      }
      state.financialObj = obj;
    },
    set_financialState(state, financialState) {
      state.financialState = financialState;
    },
  },
  actions: {
    setPersonInfo({
      commit
    }) {
      if (this.state.user.usertype === 'employee') {
        getManaPersonMidInfo().then(resa => {
          if (resa.status >= 200 && resa.status < 400) {
            if (resa.data) {
              let _datas = resa.data
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
        return
      }
      getPersonMidInfo().then(resa => {
        if (resa.status >= 200 && resa.status < 400 && resa.data) {
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
    }
  }
}
