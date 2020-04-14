export const provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];
export const selectProvinceText = ["北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区"];
export const provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '全国'];
const province = require.context('./map/province', false, /\.js/);
const path = require('path')
const modules = {}
province.keys().forEach(key => {
  const name = path.basename(key, '.js')
  console.log(name)
  modules[name] = province(key).default || province(key)
})

export default modules;
import { dataMap } from './json/data.js'
import { EventEmitter } from './eventEmitter.js'
export const getData = (params) => {
   return new Promise((resolve, reject) => {
	   let resData = [];
	   if(params.name == '全国'){
		   resData = dataMap;
	   }else{
		   resData = dataMap.find(item => {
			   if(item.name == params.name){
				   return true;
			   }
		   }).children;
	   }
	   setTimeout(() => {
		   resolve(resData);
	   }, 1000)
   })
}

export const visualMapPieces = [{
									min: 60,
									label: '> 60'
								},
								{
									min: 40,
									max: 59,
									label: '40 ~ 59'
								},
								{
									min: 20,
									max: 39,
									label: '20 ~ 39'
								},
								{
									min: 1,
									max: 19,
									label: '1 ~ 19'
								},
								{
									value: 0,
									label: '0'
								},
							]
							
export const  Controller = function(){
	EventEmitter.call(this);
}

function content(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}

Controller.prototype = content(EventEmitter.prototype);

Controller.prototype.constructor = Controller;

Controller.prototype.setArea = function(name){
	this.emit("area", name);
}

