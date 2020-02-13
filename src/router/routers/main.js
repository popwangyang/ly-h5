const main = () => import('@/views/main/index.vue') // 首页
const withdrawalMain = () => import('@/views/main/withdrawal/main.vue') // 提现主页
const withdrawalDetail = () => import('@/views/main/withdrawal/detail.vue') // 提现记录
const withdrawal = () => import('@/views/main/withdrawal/index.vue') // 提现确认
const withdrawalHelp = () => import('@/views/main/withdrawal/help.vue') // 金额描述
const withdrawalResult = () => import('@/views/main/withdrawal/result.vue') // 提现结果

export default [{
    path: '/main',
    name: 'mainPage',
    meta: {
      title: '首页',
      showBottomTab: true,
      cacheTos: ['KTVDetail', 'cardTicket', 'OrderSharing', 'personalCenter']
    },
    component: main
  }, {
    path: '/withdrawalMain',
    name: 'withdrawalMain',
    component: withdrawalMain,
    meta: {
      title: '提现主页',
    },
  },
  {
    path: '/withdrawalDetail',
    name: 'withdrawalDetail',
    component: withdrawalDetail,
    meta: {
      title: '提现记录',
    },
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: withdrawal,
    meta: {
      title: '提现',
    },
  },
  {
    path: '/withdrawalhelp',
    name: 'withdrawalhelp',
    component: withdrawalHelp,
    meta: {
      title: '金额说明',
    },
  },
  {
    path: '/withdrawalResult',
    name: 'withdrawalResult',
    component: withdrawalResult,
    meta: {
      title: '提现结果',
    },
  },
]
