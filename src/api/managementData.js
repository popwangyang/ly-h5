import axios from '@/libs/api.request';
import {getMapData} from '@/libs/util';


// 合同生效中的场所数量
export const getAllContractingKtv = (params) => {
	return axios.request({
	  url: '/ktv/place/contracting-ktv',
	  params,
	  method: 'get',
	})
}

// 场所概况(全部场所统计信息)
export const dataDisplay = (params) => {
	return axios.request({
	  url: '/ktv/place/statistics-overview',
	  params,
	  method: 'get',
	})
}

// 获取总计统计数据
export const orderDisplay = (params) => {
	return axios.request({
	  url: '/order/order-total-statistics',
	  params,
	  method: 'get',
	})
}

// 地域分布情况(适用于地图图层数据请求)

const axiosRegion = (params) => {
	return axios.request({
	  url: '/ktv/place/statistics-table',
	  params,
	  method: 'get',
	})
}

const goo = (params) => {
	let p1 = axiosRegion(params);
	let p2 = getAllContractingKtv(params);
	return Promise.all([p1, p2]);
}





export const region = (params) => {
	return new Promise((resolve, reject) => {
		goo(params).then(res => {
			console.log(res);
			let mapData = getMapData(params);
			let results = [];
			let data = res[0].data;
			let allTotal = res[1].data.contracting_count;
			let key = params.level == 1 ? 'province': params.level == 2 ? 'city':'country';
			mapData.forEach(item => {
				let obj = {
					name: item.label,
					cityNumber:0,
					ktv: 0,
					count:0,
					grant_num_city: 0,
					sign_num_ktv: 0,
					sign_num_room: 0,
					implement_num_ktv: 0,
					implement_num_room: 0,
					cdn_num_ktv: 0,
					cdn_num_room: 0,
					scan_num_ktv: 0,
					scan_num_room: 0,
					business: 0,
					un_business: 0,
					all_sign_num_ktv: allTotal
				}
				let areaData = data.find(resItem => resItem[key].indexOf(item.label) > -1 );
				if(areaData){
					obj.city = areaData.grant_num_city;
					obj.ktv = areaData.sign_num_ktv;
					obj.count = areaData.sign_num_room;
					Object.assign(obj, areaData);
				}
				// console.log(params);
				results.push(obj);
			})
			resolve(results);
		})
	})
}
