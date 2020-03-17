import Cookies from 'js-cookie'
import moment from 'moment'
import {
	Toast
} from 'vant'
import config from '@/config'
import store from '@/store'

const {
	title,
	cookieExpires
} = config
export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'

export const getUser = () => {
	const user = Cookies.get(USER_KEY)
	if (user) return JSON.parse(user)
	else return false
}

export const setUser = (data) => {
	var user = getUser()
	if (user) {
		if (JSON.stringify(data) != JSON.stringify(user)) {
			Cookies.set(USER_KEY, JSON.stringify(data), {
				expires: 15
			})
		}
	} else {
		Cookies.set(USER_KEY, JSON.stringify(data), {
			expires: 15
		})
	}
}

export const removeUser = () => {
	Cookies.remove(USER_KEY)
}


/* 
 * 设置token;
 * @params{String} token token值
 * 
 */
export const setToken = (token) => {
	Cookies.set(TOKEN_KEY, token, {
		expires: cookieExpires || 1
	})
}

/* 
 * 获取token;
 * @return {String | false} 没有token时返回false。
 * 
 */
export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY)
	if (token) return token
	else return false
}

/* 
 * 请求token缓冲器;
 * @params{Number} time 设置需要缓冲的间隔时间
 * @return {Boolean} ture时为缓冲结算,false时为缓冲中。
 * 
 */
var flage = true
export const spring = (time) => {
	var result = flage
	if (flage) {
		flage = false
		setTimeout(() => {
			flage = true
		}, time)
		return result
	}
	return false
}


/* 
 * 抛出错误信息;
 * @params{Object} data 抛出的错误体
 * 
 * 
 */

export const throwError = function (data) {
	if (data.message == '数据验证失败') {
		data.errors.map(item => {
			Toast(item.message);
		})
	} else {
		Toast(data.error);
	}
}

export const NoTokenRefresh = (option) => {
	// console.log(option.params.NoTokenRefresh)
	if (option.params && option.params.NoTokenRefresh) {
		return true
	} else if (option.data && option.data.NoTokenRefresh) {
		return true
	} else {
		return false
	}
}

/* 
 * 函数防抖;
 * @params{Function} fn 回调函数
 * @params{Number} wait 等待时间
 * 
 */
var timeout = null;
export const debounce = (fn, wait) => {
	return function () {
		console.log(timeout)
		if (timeout != null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(fn, wait);
	}
}

/* 
 * 节流;
 * @params{Function} func 回调函数
 * @params{Number} delay 延时时间
 * 
 */
export const throttle = (func, delay) => {
	var timer = null;
	return function () {
		var context = this;
		var args = arguments;
		if (!timer) {
			timer = setTimeout(function () {
				func.apply(context, args);
				timer = null;
			}, delay);
		}
	}
}

/* 
 * 时间转换函数;
 * @params{Date} date 需要转换的时间对象
 * @return{String} 返回转换后的结果 eg:2019-01-01
 * 
 */
export const getDay = (date) => {
	var results = ''
	var date = date || new Date()
	var year = date.getFullYear()
	var mount = date.getMonth() + 1
	var day = date.getDate()
	mount = mount > 9 ? mount : '0' + mount
	day = day > 9 ? day : '0' + day
	results = year + '-' + mount + '-' + day
	return results
}

export const getDayTime = (date, isTomorrow) => {
	var results = ''
	var date = date || new Date()
	var year = date.getFullYear()
	var mount = date.getMonth() + 1
	var day = date.getDate()
	mount = mount > 9 ? mount : '0' + mount
	day = day > 9 ? day : '0' + day
	results = year + '-' + mount + '-' + day + ' 00:00:00'
	if(isTomorrow){
	results = year + '-' + mount + '-' + day + ' 23:59:59'
	}
	return results
}

/* 
 * 获取ktv营业的星期天;
 * @params{Array} days 数组对象
 * @return{String} 返回转换后的结果 eg:周一、周二
 * 
 */
export const getWeeks = (days) => {
	let result = '';
	days.forEach(item => {
		switch (item) {
			case '1':
				result += '周一、'
				break;
			case '2':
				result += '周二、'
				break;
			case '3':
				result += '周三、'
				break;
			case '4':
				result += '周四、'
				break;
			case '5':
				result += '周五、'
				break;
			case '6':
				result += '周六、'
				break;
			case '7':
				result += '周日、'
				break;
		}
	})
	if (result != '') {
		return result.substr(0, result.length - 1);
	} else {
		return "";
	}
}

/* 
 
 */
export const getTime = (time) => {
	let times = time.split(',');
	let result = '';
	times.map(item => {
		let hours = item.split('-');
		let startTime = setHours(hours[0]);
		let endTime = setHours(hours[1]);
		let str = ''
		console.log(startTime, endTime)
		if (startTime > endTime) {
			str = `${hours[0]} 至 次日${hours[1]}`;
		} else {
			str = `${hours[0]} 至 ${hours[1]}`;
		}
		result += str + ',　';
	})
	return result;
}

const setHours = (time) => {
	let date = new Date();
	let times = time.split(':')
	let hours = times[0];
	let minute = times[1];
	return date.setHours(hours, minute);
}

/* 
 * ktv实施信息获取位置参数的类型;
 * @params{Object} position 位置坐标
 * @return{Number} 返回位置坐标类型
 * 
 */

export const getPositionValue = (position, list) => {
	let str = position.x + "," + position.y;
	let result = list[list.length - 1].value;
	list.forEach(item => {
		if (item.label == str) {
			result = item.value;
		}
	})
	return result;
}


/* 
 * ktv实施信息设置位置参数方向;
 * @params{Number} x 位置的横坐标
 * @params{Number} width 屏幕的x的宽度
 * @return{String} 返回位置方向eg: 左
 * 
 */
const setDirection = (x, width) => {
	let result;
	if (width.type == 1) {
		console.log(x, width.width);
		result = x <= width.width / 2 ? '左' : '右';
	} else {
		result = width.width;
	}
	return result;
}

/* 
 * ktv实施信息设置提交参数
 * @params{Object} data 
 * @params{Array} list 位置类型列表
 * @params{Number} width 屏幕的x的宽度
 * @return{Object} 构造的提交参数实例
 * 
 */
export const setFormData = (data, list, width) => {
	let result = {};
	list.map(item => {
		if (item.value == data.value) {
			if (item.label == '自定义') {
				result.x = data.position.positionX;
				result.y = data.position.positionY;
				result.p = setDirection(data.position.positionX, width);
			} else {
				let arr = item.label.split(',');
				result.x = arr[0];
				result.y = arr[1];
				result.p = setDirection(arr[0], width);
			}
		}
	})
	return result;
}

/* 
 * 设置年份
 * */
export const setYears = () => {
	let result = [];
	let year = new Date().getFullYear() - 40;
	for (let i = 0; i < 80; i++) {
		let str = year + i + '年';
		result.push(str);
	}
	return result;
}

/* 
  获取url
*/
export const getBaseUrl = () => {
	const url = window.location.href;
	let baseUrl = '/lyh5';
	if (url.indexOf('lyh5Platform') > -1) {
		baseUrl = 'lyh5Platform';
	}
	return baseUrl;
}

/* 
 根据url验证是否是平台账号
*/
export const validPlatform = (type, isValidCode = false) => {
	let roles = ['employee', 'platform', 'agentibus'];
	const msg1 = "该账号为平台用户,无法登录!!";
	const msg2 = "该账号非平台用户,无法登录!!";
	const msg3 = "请输入正确的手机号或邮箱!!";
	let data = {
		flag: true,
		msg: null
	}
	if (getBaseUrl() == 'lyh5Platform') {
		if (roles.indexOf(type) == -1) {
			data.flag = false;
			data.msg = msg2;
		}
	} else {
		if (roles.indexOf(type) > -1) {
			data.flag = false;
			data.msg = msg1;
		}
	}
	if (!data.flag && isValidCode) {
		data.msg = msg3;
	}

	return data;

}

/* 
 数据扁平化；
 */
export const Delayering = (data) => {
	let result = {};
	let getDataType = (o) => {
		if(o === null){
			return null;
		}else if(typeof o === 'object'){
			if(typeof o.length === 'number'){
				return 'array';
			}else{
				return 'object';
			}
		}else{
			return 'other type'
		}
	}
	
	function goo(data){
		Object.keys(data).forEach(item => {
			if(getDataType(data[item]) === 'object'){
				goo(data[item])
			}else{
				result[item] = data[item];
			}
		})
	}
	
	goo(data);
	
	return result;
	
}