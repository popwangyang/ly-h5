// 前缀金额
const changeMoney = val => {
  return `￥${val}`;
}

// 保留两位小数
const toFixed2 = val => {
  if (val) return parseFloat(val).toFixed(2);
  return val.toFixed(2)
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

// 三分数字
const toThousands = (str) => {

    if(str == null){
		str = "";
	}
	str = str.toString();
	var newStr = "";
	var count = 0;

	if (str.indexOf(".") == -1) {
		for (var i = str.length - 1; i >= 0; i--) {
			if (count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		str = newStr + ".00"; //自动补小数点后两位
	} else {
		for (var i = str.indexOf(".") - 1; i >= 0; i--) {
			if (count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
	}
	return str;
	

}



export {
  changeMoney,
  toFixed2,
  desensitization,
  toThousands
}
