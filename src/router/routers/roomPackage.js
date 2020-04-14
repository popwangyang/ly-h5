const roomPackage = () => import('@/views/roomPackage');

export default [{
    path: '/roomPackage',
    name: 'roomPackage',
    meta: {
      title: '开房套餐',
      showBottomTab: true,
      cacheTos: [],
    },
    component: roomPackage
  }
]