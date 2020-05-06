import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import {
	getToken,
	setToken,
	getBaseUrl,
} from '@/libs/util'
import config from '@/config'

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let result;

if (process.env.NODE_ENV === 'production') {
	result = {
		routes,
		base: getBaseUrl(),
		mode: 'history'
	}
} else {
	result = {
		routes,
	}
}

const router = new Router(result)

const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
	const token = getToken();
	const theme = store.state.app.theme;
	if ((!token && to.name != LOGIN_PAGE_NAME) || !theme) { // 未登录且要跳转的页面不是登录页
		next({
			name: LOGIN_PAGE_NAME,
		})
	} else if (!token && to.name == LOGIN_PAGE_NAME) { // 未登录想要跳到登陆页面;
		next();
	} else if (token && to.name == LOGIN_PAGE_NAME) { // 已登录想要跳到登陆页面;
	let path = store.state.app.theme.tabBottoms[0].path;
		next({
			path: path
		})
	} else {
		next();
	}
})

router.afterEach(to => {

})

export default router