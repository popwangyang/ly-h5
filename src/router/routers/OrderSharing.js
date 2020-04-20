const OrderSharing = () => import('@/views/OrderSharing') // 订单分成模块
const orderSharingDetail = () => import('@/views/OrderSharing/detail') // 终端-订单分成详情
const orderSharingIconDetail = () => import('@/views/OrderSharing/iconDetail.vue') // 代垫方-订单分成详情
const orderKTVDetail = () => import('@/views/OrderSharing/ktv.vue') // ktv终端-订单分成详情
const ordeManaDetail = () => import('@/views/OrderSharing/mana.vue') // 管理端-订单分成详情
const searchOrderPage = () => import('@/views/OrderSharing/components/detail.vue')

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
  }, {
    path: '/orderKTVDetail',
    name: 'orderKTVDetail',
    meta: {
      title: '订单详情',
    },
    component: orderKTVDetail
  }, {
    path: '/ordeManaDetail',
    name: 'ordeManaDetail',
    meta: {
      title: '订单详情',
    },
    component: ordeManaDetail
  },
]
