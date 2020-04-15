import axios from '@/libs/api.request';
import {getMapData} from '@/libs/util';


// 场所概况(全部场所统计信息)
export const dataDisplay = () => {
	return axios.request({
	  url: '/ktv/place/statistics-overview',
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



export const region = (params) => {
	return new Promise((resolve, reject) => {
		axiosRegion(params).then(res => {
			let mapData = getMapData(params);
			let results = [];
			let data = res.data;
			let key = params.province ? 'city':'province';
			mapData.forEach(item => {
				let obj = {
					name: item.label,
					ktv: 0,
					count:0,
				}
				let areaData = data.find(resItem => resItem[key].indexOf(item.label) > -1 );
				if(areaData){
					obj.ktv = areaData.sign_num_ktv;
					obj.count = areaData.sign_num_room;
				}
				results.push(obj);
			})
			resolve(results);
		})
	})
}

// export const statisticData = (params) =>{
	
// }