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
      let art = obj.attr
      if (!state.comboItem) {
        state.comboItem = {}
        state.comboItem[String(art)] = obj.val;
        return
      }
      state.comboItem[obj.attr] = obj.val;
      // if (!obj) {
      //   state.comboItem = null
      //   console.log(0);
      //   return
      // }
      // let art = obj.attr
      // if (state.comboItem) {
      //   console.log(1);

      //   state.comboItem[obj.attr] = obj.val;
      //   return
      // }
      // console.log(2);
      // state.comboItem = {}
      // state.comboItem[String(art)] = obj.val;
    },
    set_addNewComboItem(state, addNewComboItem) {
      state.addNewComboItem = addNewComboItem;
    },
  },
  actions: {}
}
