const combo = () => import('@/views/roomPackage/index.vue') // 套餐主页
const newcombo = () => import('@/views/roomPackage/new.vue') // 新增
const manaCombo = () => import('@/views/roomPackage/manaCombo.vue') // 管理
const comboTime = () => import('@/views/roomPackage/time.vue') // 时间选择
const comboDetail = () => import('@/views/roomPackage/detail.vue') // 套餐详情

export default [{
  path: '/roomPackage',
  name: 'roomPackage',
  meta: {
    title: '开房套餐',
    showBottomTab: true,
    cacheTos: ['manaCombo'],
  },
  component: combo
}, {
  path: '/newcombo',
  name: 'newcombo',
  meta: {
    title: '套餐新增',
    showBottomTab: false,
    cacheTos: ['comboTime']
  },
  component: newcombo,
}, {
  path: '/manaCombo',
  name: 'manaCombo',
  meta: {
    title: '套餐管理',
    showBottomTab: false,
    cacheTos: ['roomPackage']
  },
  component: manaCombo,
}, {
  path: '/comboTime',
  name: 'comboTime',
  meta: {
    title: '可用时段',
    showBottomTab: false,
    cacheTos: ['newcombo']
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
