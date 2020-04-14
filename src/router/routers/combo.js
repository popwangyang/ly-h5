const combo = () => import('@/views/combo/index.vue') // 套餐主页
const newcombo = () => import('@/views/combo/new.vue') // 新增
const manaCombo = () => import('@/views/combo/manaCombo.vue') // 管理
const comboTime = () => import('@/views/combo/time.vue') // 时间选择
const comboDetail = () => import('@/views/combo/detail.vue') // 套餐详情

export default [{
  path: '/combo',
  name: 'combo',
  meta: {
    title: '套餐',
    showBottomTab: true,
  },
  component: combo,

}, {
  path: '/newcombo',
  name: 'newcombo',
  meta: {
    title: '套餐新增',
    showBottomTab: false,
  },
  component: newcombo,
}, {
  path: '/manaCombo',
  name: 'manaCombo',
  meta: {
    title: '套餐管理',
    showBottomTab: false,
  },
  component: manaCombo,
}, {
  path: '/comboTime',
  name: 'comboTime',
  meta: {
    title: '可用时段',
    showBottomTab: false,
  },
  component: comboTime,
}, {
  path: '/comboDetail',
  name: 'comboDetail',
  meta: {
    title: '套餐详情',
    showBottomTab: false,
  },
  component: comboDetail,
}, ]
