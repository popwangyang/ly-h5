const login = () => import('@/views/login/login.vue') // 登录
const home = () => import('@/views/home/home.vue') // 内容主框架
const forgetPassword =() => import('@/views/login/components/forgetPassword/index.vue')  // 忘记密码
let routers = [
	{
		path: '*',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: login
	},
	{
		path: '/forgetPassword',
		name: 'forgetPassword',
		component: forgetPassword
	},
	{
		path: '/home',
		name: 'home',
		component: home
	}
]

const path = require('path');
const files = require.context('./', false, /\.js$/);
let children = [];
files.keys().forEach(key => {
	const name = path.basename(key, '.js');
	if(name != 'index'){
	  children = [...children, ...files(key).default]
	}
})
routers.forEach(item => {
	if(item.name == 'home'){
	  item.children = children;
	}
})

export default routers;