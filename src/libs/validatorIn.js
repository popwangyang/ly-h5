//  输入框验证

import {
  Toast
} from 'vant'

const option = {
  isFixed2: (v, e) => {
    if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(v)) {
      return e;
    }
  },
  isNonEmpty: (v, e) => { // 不为空
    if (!v) {
      return e;
    }
  },
  isNumber: (v, e) => { // 为正整数
    if (!/^[+]{0,1}(\d+)$/.test(v)) {
      return e;
    }
  },
  isEmail: (v, e) => { // 为邮箱
    if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v)) {
      return e;
    }
  },
  isPhone: (v, e) => { // 为手机话号码
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(v)) {
      return e;
    }
  },
}

const throwMessage = (o, v, e, f) => {
  let err = ''
  if (!o) return
  err = option[o](v, e)
  if (!err) return 0
  Toast(err)
  return 1
}

export default {
  throwMessage
};
