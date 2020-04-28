export default {
	theme_platform: {
		color: '#0082FF',
		tabBottoms: [
			{
				text: '账户数据',
				path: '/main',
				active: require('@/assets/bottomTabs/mainA.png'),
				inactive: require('@/assets/bottomTabs/mainB.png')
			},
			{
				text: 'KTV管理',
				path: '/ktvmanage',
				active: require('@/assets/bottomTabs/ktvA.png'),
				inactive: require('@/assets/bottomTabs/ktvB.png')
			},
			{
				text: '订单分成',
				path: '/OrderSharing',
				active: require('@/assets/bottomTabs/OrderA.png'),
				inactive: require('@/assets/bottomTabs/OrderB.png')
			},
			{
				text: '个人中心',
				path: '/personalCenter',
				active: require('@/assets/bottomTabs/personA.png'),
				inactive: require('@/assets/bottomTabs/personB.png')
			}
		]
	},
	theme_ktv: {
		color: '#0082FF',
		tabBottoms: [
			{
				text: '账户数据',
				path: '/main',
				active: require('@/assets/bottomTabs/mainA.png'),
				inactive: require('@/assets/bottomTabs/mainB.png')
			},
			{
				text: '分成明细',
				path: '/OrderSharing',
				active: require('@/assets/bottomTabs/OrderA.png'),
				inactive: require('@/assets/bottomTabs/OrderB.png')
			},
			{
				text: '开房套餐',
				path: '/roomPackage',
				active: require('@/assets/bottomTabs/roomA.png'),
				inactive: require('@/assets/bottomTabs/roomB.png')
			},
			{
				text: '卡券核销',
				path: '/cardTicket',
				active: require('@/assets/bottomTabs/cardTicketA.png'),
				inactive: require('@/assets/bottomTabs/cardTicketB.png')
			},
			{
				text: '个人中心',
				path: '/personalCenter',
				active: require('@/assets/bottomTabs/personA.png'),
				inactive: require('@/assets/bottomTabs/personB.png')
			}
		]
	},
	theme_ktv_clerk: {
		color: '#0082FF',
		tabBottoms: [
			{
				text: '订单管理',
				info: 0,
				path: '/orderManagement',
				active: require('@/assets/bottomTabs/mainA.png'),
				inactive: require('@/assets/bottomTabs/mainB.png')
			},
			{
				text: '开房套餐',
				path: '/roomPackage',
				active: require('@/assets/bottomTabs/roomA.png'),
				inactive: require('@/assets/bottomTabs/roomB.png')
			},
			{
				text: '卡券核销',
				path: '/cardTicket',
				active: require('@/assets/bottomTabs/cardTicketA.png'),
				inactive: require('@/assets/bottomTabs/cardTicketB.png')
			},
			{
				text: '个人中心',
				info: 0,
				path: '/personalCenter',
				active: require('@/assets/bottomTabs/personA.png'),
				inactive: require('@/assets/bottomTabs/personB.png')
			}
		]
	}
}