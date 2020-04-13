const combo = () => import('@/views/combo/index.vue') // 套餐
const newcombo = () => import('@/views/combo/new.vue') // 套餐
const manaCombo = () => import('@/views/combo/manaCombo.vue') // 套餐

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
}]
