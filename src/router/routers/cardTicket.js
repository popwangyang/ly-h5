const cardTicket = () => import('@/views/cardTicket') // 卡券核销模块
const cardTicketRecord = () => import('@/views/cardTicket/record')  // 卡券核销记录


export default [
	{
		path: '/cardTicket',
		name: 'cardTicket',
		meta:{
			title: '卡券核销',
			showBottomTab: true
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
]