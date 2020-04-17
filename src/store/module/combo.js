export default {
  state: {
    comboItem: null, // 套餐详情
    addNewComboItem: null, // 新增套餐
  },
  mutations: {
    set_comboItem(state, comboItem) {
      state.comboItem = comboItem;
    },
    set_comboItemAttr(state, obj) {
      state.comboItem[obj.attr] = obj.val;
    },
    set_addNewComboItem(state, addNewComboItem) {
      state.addNewComboItem = addNewComboItem;
    },
  },
  actions: {}
}
