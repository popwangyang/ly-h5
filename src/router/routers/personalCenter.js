const personalCenter = () => import('@/views/personalCenter') // 个人中心模块
const personalInfo = () => import('@/views/personalCenter/info') // 个人中心模块
const personContract = () => import('@/views/personalCenter/contract') // 个人中心合同信息
const changePassword = () => import('@/views/login/components/forgetPassword/components/changePassword') // 修改密码
const PdfPreview = () => import('@/components/PdfPreview') // pdf预览

export default [{
    path: '/personalCenter',
    name: 'personalCenter',
    meta: {
      title: '个人中心',
      showBottomTab: true,
      cacheTos: ['personalInfo', 'personContract', 'withdrawalDetail', 'withdrawal', 'withdrawalMain'],
    },
    component: personalCenter
  },
  {

    path: '/personalInfo',
    name: 'personalInfo',
    meta: {
      title: '消息中心',
      cacheTos: ['personalCenter'],
    },
    component: personalInfo
  },
  {
    path: '/personContract',
    name: 'personContract',
    meta: {
      title: '合同信息',
      cacheTos: ['contractDetail', 'personalCenter']
    },
    component: personContract
  }, {
    path: '/changePassword',
    name: 'changePassword',
    meta: {
      title: '更改密码',
      cacheTos: ['personalCenter']
    },
    component: changePassword
  },
  {
    path: '/PdfPreview',
    name: 'PdfPreview',
    meta: {
      title: 'PDF预览'
    },
    component: PdfPreview
  }
]
