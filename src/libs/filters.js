// 前缀金额
const changeMoney = val => {
  return `￥${val}`;
}

// 保留两位小数
const toFixed2 = val => {
  // return val.toFixed(2);
  return val
}

// 姓名脱敏
const desensitization = (str) => {
  let ruten;
  if (typeof str == "string") {
    if (str.length === 2) {
      ruten = str.substring(1);
    } else {
      ruten = str.substring(1, 2);
    }
    return str.replace(ruten, "*");
  }
}

export {
  changeMoney,
  toFixed2,
  desensitization
}