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
      cacheTos: ['roomPackage', 'cardTicket','personalCenter','managementDetail'],
    },
    component: orderManagement,
  },
  {
	path: '/orderManagement/managementDetail',
	name: 'managementDetail',
	meta: {
	  title: '订单详情',
	},
	component: managementDetail,  
  }
]