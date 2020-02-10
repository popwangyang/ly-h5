const OrderSharing = () => import('@/views/OrderSharing') // 订单分成模块
const orderSharingDetail = () => import('@/views/OrderSharing/detail') // 终端-订单分成详情
const orderSharingIconDetail = () => import('@/views/OrderSharing/iconDetail.vue') // ktv终端-订单分成详情
const searchOrderPage = () => import('@/views/OrderSharing/components/detail.vue') // ktv终端-订单分成详情

export default [{
		path: '/OrderSharing',
		name: 'OrderSharing',
		meta: {
			title: '订单及分成',
			showBottomTab: true,
			cacheTos: ['mainPage', 'cardTicket', 'orderSharingDetail', 'orderSharingIconDetail', 'OrderSharing', 'personalCenter', 'ktvmanage', 'searchPage']
		},
		component: OrderSharing
	},
	{
		path: '/orderSharingDetail',
		name: 'orderSharingDetail',
		meta: {
			title: '订单详情',
		},
		component: orderSharingDetail
	},
	{
		path: '/searchOrderPage',
		name: 'searchOrderPage',
		meta: {
			title: '订单搜索',
		},
		component: searchOrderPage

	},
	{
		path: '/orderSharingIconDetail',
		name: 'orderSharingIconDetail',
		meta: {
			title: '订单详情',
		},
		component: orderSharingIconDetail
	},
]