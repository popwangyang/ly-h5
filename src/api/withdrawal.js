import axios from '@/libs/api.request'

// 获取提现记录列表;
export const getlist = (params) => {
	// return axios.request({
	//   url: `/copyright/rbac/company-brands`,
	//   params,
	//   method: 'get'
	// })
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				results: [{
						time: '12月11日 11:00',
						stat: 0,
						money: 100,
						nowMoney: 96,
						payRate: 0.68,
						poundage: 5
					},
					{
						time: '12月12日 12:00',
						stat: 1,
						money: 130,
						nowMoney: 96,
						payRate: 0.58,
						poundage: 5
					},
					{
						time: '12月11日 11:00',
						stat: 0,
						money: 20,
						nowMoney: 96,
						payRate: 0.48,
						poundage: 5
					},
					{
						time: '12月13日 11:00',
						stat: 1,
						money: 100,
						nowMoney: 96,
						payRate: 0.68,
						poundage: 5
					},
					{
						time: '12月14日 11:00',
						stat: 1,
						money: 100,
						nowMoney: 96,
						payRate: 0.78,
						poundage: 5
					},
					{
						time: '12月15日 11:00',
						stat: 0,
						money: 150,
						nowMoney: 644,
						payRate: 0.48,
						poundage: 5
					},
				],
				total: 40
			})
		}, 1000)
	})
}
// 获取提现反馈;
export const getDetail = (params) => {
	// return axios.request({
	//   url: `/copyright/rbac/company-brands`,
	//   params,
	//   method: 'get'
	// })
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				results: {
					bank: '工商银行(9386)',
					inputnum: 8000,
					poundange: 2,
					toAccount: 7998
				}
			})
		}, 1000)
	})
}