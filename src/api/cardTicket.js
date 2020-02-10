import axios from '@/libs/api.request'

// 获取卡券核销列表;
export const getCardTicketList = (data) => {
	return new Promise((resolve, reject) => {
		let params = {
			p_index: data.page_index,
			p_size: data.page_size,
		}
		delete data.page_index;
		delete data.page_size;
		Object.assign(params, data);
		console.log(params);
		axios.request({
		  url: `/activities/card-operate-log`,
		  params,
		  method: 'get'
		}).then(res => {
			console.log(res)
			let result = {
				data: res.data.data,
				total: res.data.code
			}
			resolve(result)
		}).catch(err => {
			reject(err);
		})
	})
	
}

export const putCard = (data) => {
	return axios.request({
	  url: `/activities/cancel/card-user`,
	  data,
	  method: 'PUT'
	})
}