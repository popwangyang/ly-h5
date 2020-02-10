import axios from '@/libs/api.request'

// 获取订单列表;
export const getOrderList = (params) => {
	return new Promise((resolve, reject) => {
		axios.request({
			url: `/order/info`,
			params,
			method: 'get'
		}).then(res => {
			let results = {
				total: res.data.count,
				data: res.data.results
			}
			resolve(results)
		}).catch(err => {
			reject(err)
		})
	})
}

// 获取订单详情;
export const orderItem = (id) => {
	return new Promise((resolve, reject) => {
		axios.request({
			url: `/order/info/${id}`,
			params: {},
			method: 'get'
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

// 获取订单活动;
export const orderActive = (params) => {
	return new Promise((resolve, reject) => {
		axios.request({
			url: `/activities/search/card-order`,
			params,
			method: 'get'
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}