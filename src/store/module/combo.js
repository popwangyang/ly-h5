export default {
  state: {
    comboItem: null, // 套餐详情
  },
  mutations: {
    set_comboItem(state, comboItem) {
      state.comboItem = comboItem;
    },
    set_comboItemAttr(state, obj) {
      state.comboItem[obj.attr] = obj.val;
    },
  },
  actions: {}
}
