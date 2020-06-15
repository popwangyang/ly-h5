const cardTicket = () => import('@/views/cardTicket') // 卡券核销模块
const cardTicketRecord = () => import('@/views/cardTicket/record')  // 卡券核销记录
const searchPage = () => import('@/components/search/detail') // 搜索页面


export default [
	{
		path: '/cardTicket',
		name: 'cardTicket',
		meta:{
			title: '卡券核销',
			showBottomTab: true,
			cacheTos:['orderManagement','roomPackage','personalCenter','cardTicketRecord'],
		},
		component: cardTicket
	},
	{
		path: '/cardTicketRecord',
		name: 'cardTicketRecord',
		meta:{
			title: '兑换记录'
		},
		component: cardTicketRecord
	},
	{
		path: '/cardTicketRecordSearch',
		name: 'cardTicketRecordSearch',
		meta:{
			title: '兑换记录'
		},
		component: searchPage
	}
]