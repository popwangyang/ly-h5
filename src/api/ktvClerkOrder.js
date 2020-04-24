import axios from '@/libs/api.request'

// 获取ktv订单
export const getOrderList = (params) => {
	return axios.request({
	  url: `/order/info`,
	  params,
	  method: 'get'
	})
}

// 修改订单的配送状态
export const putOrderDeliverStatues = (data) => {
	let id = data.id;
	delete data.id;
	return axios.request({
	  url: `/order/package/${id}`,
	  data,
	  method: 'patch'
	})
}

// 获取订单的详情
export const getOrderDetail = (id) => {
	return axios.request({
	  url: `/order/info/${id}`,
	  method: 'get'
	})
}