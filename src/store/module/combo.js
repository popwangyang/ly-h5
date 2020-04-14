import {
  getPackageDetail
} from "@/api/combo"

export default {
  state: {
    comboItem: null, // 套餐详情
  },
  mutations: {
    set_comboItem(state, comboItem) {
      state.comboItem = comboItem;
    },
  },
  actions: {
    getPackageDetail({
      commit
    }, {
      ktv_id,
      pk
    }) {
      return new Promise((resolve, reject) => {
        getPackageDetail({
          ktv_id,
          pk
        }).then(res => {
          if (res.status < 400) {
            console.log('获取详情');
            console.log(res.data);
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
  }
}
