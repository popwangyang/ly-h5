// 表单验证函数
import { Toast } from 'vant'
var strategies = {
    isNonEmpty: function (value, errorMsg) { // 不为空
	  if (value === '') {
		return errorMsg;
	  }
    },
    isNumber: function(value, errorMsg) {  // 为正整数
	 if (!/^[+]{0,1}(\d+)$/.test(value)) {
	    return errorMsg;
	  }
	},
	isEmail: function(value, errorMsg) {  // 为邮箱
	  if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) {
	     return errorMsg;
	   }
	},
	isPhone: function(value, errorMsg) {  // 为手机话号码
	  if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
	     return errorMsg;
	   }
	},
	isGateway: function(value, errorMsg) {  // 为网关格式
	  if (!/^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/.test(value)) {
	     return errorMsg;
	   }
	},
	isMac: function(value, errorMsg) {  // Mac地址格式验证
		if (!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value)) {
		   return errorMsg;
		 }
	}
}

var Validator = function(){
	this.cache = [];
}

Validator.prototype.add = function(value, rules, data){
	for(var i = 0; i < rules.length; i++){
		let rule = rules[i];
		if(rule.required){
			if(rule.validate){
				this.cache.push(function(){
					return rule.validate(value, data)
				})
			}else if(rule.type){
				this.cache.push(function(){
					return strategies[rule.type](value, rule.message)
				})
			}else{
				this.cache.push(function(){
					return strategies.isNonEmpty(value, rule.message)
				})
			}
		}else if(rule.type){
			if(rule.required == false){
				if(value != '' && value != null){
				  this.cache.push(function(){
				  	return strategies[rule.type](value, rule.message)
				  })	
				}
			}else{
				this.cache.push(function(){
					return strategies[rule.type](value, rule.message)
				})
			}
		}else if(rule.validate){
			if(rule.required == false){
				if(value != ''){
				  this.cache.push(function(){
				  	return rule.validate(value, data)
				  })	
				}
			}else{
				this.cache.push(function(){
					return rule.validate(value, data)
				})
			}
		}
	}
}

Validator.prototype.start = function(){
	for(var i = 0; i < this.cache.length; i++){
		let errorMsg  = this.cache[i]();
		if(errorMsg){
			console.log(errorMsg)
			return errorMsg;
		}
	}
}

let formValidate = function(formData, rules){
	return new Promise((resolve, reject) => {
		let validator = new Validator();
			Object.keys(rules).forEach((item) => {
				validator.add(formData[item], rules[item], formData);
			})
			let errorMsg  = validator.start();
			if(errorMsg){
				Toast(errorMsg);
				resolve(false);
			}else{
				resolve(true);
			}
		})
	}
	

export default formValidate