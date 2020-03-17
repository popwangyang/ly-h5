const searchPage = () => import('@/components/search/detail') // 搜索页面

export default [
	{
		path: '/searchPage',
		name: 'searchPage',
		meta:{
			title: '搜索',
			cacheTos:['KTVDetail']
		},
		component: searchPage
	},
]