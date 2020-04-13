const orderManagement = () => import('@/views/orderManagement');
const toBeDelivered = () => import('@/views/orderManagement/components/toBeDelivered');
const haveBeenDelivered = () => import('@/views/orderManagement/components/haveBeenDelivered');
const managementDetail = () => import('@/views/orderManagement/detail')

export default [{
    path: '/orderManagement',
    name: 'orderManagement',
    meta: {
      title: '订单管理',
      showBottomTab: true,
      cacheTos: [],
    },
    component: orderManagement,
	children:[
			{
				path:'toBeDelivered',
				name: 'toBeDelivered',
				meta:{
					title: '订单管理',
					showBottomTab: true,
				},
				component: toBeDelivered
			},
			{
				path:'haveBeenDelivered',
				name: 'haveBeenDelivered',
				meta:{
					title: '订单管理',
					showBottomTab: true,
				},
				component: haveBeenDelivered
			},
		]
  },
  {
	path: '/managementDetail',
	name: 'managementDetail',
	meta: {
	  title: '订单详情',
	},
	component: managementDetail,  
  }
]