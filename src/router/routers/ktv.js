const ktvmanage = () => import('@/views/ktv/index.vue') // KTV模块
const ktvDetail = () => import('@/views/ktv/detail.vue') //KTV模块详情页

/* 合同模块 */
const contract = () => import('@/views/ktv/components/contract') // 合同信息
const contractDetail = () => import('@/views/ktv/components/contract/detail') // 合同详情
const contractChangeHistory = () => import('@/views/ktv/components/contract/history') // 合同变更历史
const approvalRecord = () => import('@/views/ktv/components/contract/approvalRecord') // 合同审批记录
const accountRecord = () => import('@/views/ktv/components/contract/accountRecord') // 合同计费记录


/* 实施信息 */
const implementation = () => import('@/views/ktv/components/implementation') // 实施信息
const impletDetail = () => import('@/views/ktv/components/implementation/detail') // 实施信息详情
const boxInformation = () => import('@/views/ktv/components/implementation/components/boxInformation') // 包厢信息
const QRCode = () => import('@/views/ktv/components/implementation/components/QRCode') // 设置二维码投射坐标
const formatResolution = () => import('@/views/ktv/components/implementation/components/formatResolution') // 设置格式及分辨率

/* 账户信息 */
const account = () => import('@/views/ktv/components/accountInfo') // 账户信息

/* 账号信息 */
const accountNumber = () => import('@/views/ktv/components/accountNumber') // 账户信息

/* 活动信息 */
const activity = () => import('@/views/ktv/components/activity') // 账户信息

export default [{
		path: '/ktvmanage',
		name: 'ktvmanage',
		meta: {
			title: 'KTV',
			showBottomTab: true,
			cacheTos: ['mainPage', 'KTVDetail', 'cardTicket', 'OrderSharing', 'personalCenter', 'searchPage']
		},
		component: ktvmanage
	},
	{
		path: '/ktvmanage/KTVDetail',
		name: 'KTVDetail',
		meta: {
			title: '场所详情',
			cacheTos: ['contract', 'implementation', 'account', 'accountNumber', 'activity']
		},
		component: ktvDetail
	},
	{
		path: '/ktvmanage/KTVDetail/contract',
		name: 'contract',
		meta: {
			title: '合同信息',
			cacheTos: ['contractDetail', 'accountRecord']
		},
		component: contract
	},
	{
		path: '/ktvmanage/KTVDetail/contract/accountRecord',
		name: 'accountRecord',
		meta: {
			title: '计费记录'
		},
		component: accountRecord
	},
	{
		path: '/ktvmanage/KTVDetail/contract/contractDetail',
		name: 'contractDetail',
		meta: {
			title: '合同详情',
			cacheTos: ['contractChangeHistory', 'approvalRecord', 'PdfPreview']
		},
		component: contractDetail
	},
	{
		path: '/contractChangeHistory',
		name: 'contractChangeHistory',
		meta: {
			title: '变更历史'
		},
		component: contractChangeHistory
	},
	{
		path: '/ktvmanage/KTVDetail/contract/contractDetail/approvalRecord',
		name: 'approvalRecord',
		meta: {
			title: '审批记录'
		},
		component: approvalRecord
	},
	{
		path: '/ktvmanage/KTVDetail/implementation',
		name: 'implementation',
		meta: {
			title: '实施信息'
		},
		component: implementation
	},
	{
		path: '/ktvmanage/KTVDetail/implementation/impletDetail',
		name: 'impletDetail',
		meta: {
			title: '实施信息'
		},
		component: impletDetail
	},
	{
		path: '/ktvmanage/KTVDetail/implementation/impletDetail/boxInformation',
		name: 'boxInformation',
		meta: {
			title: '包厢信息'
		},
		component: boxInformation
	},
	{
		path: '/ktvmanage/KTVDetail/implementation/impletDetail/QRCode',
		name: 'QRCode',
		meta: {
			title: '二维码投射坐标'
		},
		component: QRCode
	},
	{
		path: '/ktvmanage/KTVDetail/implementation/impletDetail/formatResolution',
		name: 'formatResolution',
		meta: {
			title: '格式及分辨率'
		},
		component: formatResolution
	},
	{
		path: '/ktvmanage/KTVDetail/account',
		name: 'account',
		meta: {
			title: '账户信息'
		},
		component: account
	},
	{
		path: '/ktvmanage/KTVDetail/accountNumber',
		name: 'accountNumber',
		meta: {
			title: '账号信息'
		},
		component: accountNumber
	},
	{
		path: '/ktvmanage/KTVDetail/activity',
		name: 'activity',
		meta: {
			title: '活动信息'
		},
		component: activity
	},
]