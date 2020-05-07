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
const HOME_PAGE_NAME = 'mainPage'

router.beforeEach((to, from, next) => {
	const token = getToken();
	console.log(to, from);
	if (!token && to.name != LOGIN_PAGE_NAME ) { // 未登录且要跳转的页面不是登录页
	    console.log(1);
		next({
			name: LOGIN_PAGE_NAME,
		})
	} else if (!token && to.name == LOGIN_PAGE_NAME) { // 未登录想要跳到登陆页面;
	    console.log(2);
		next();
	} else if (token && to.name == LOGIN_PAGE_NAME) { // 已登录想要跳到登陆页面;
	   console.log(3);
	    next({
			replace: true,
	    	name: HOME_PAGE_NAME
	    })
	} else {
		console.log(4);
		if(!store.state.app.theme){
			console.log(0);
			setToken('');
			next({
				name: LOGIN_PAGE_NAME,
			})
		} else {
			next();
		}
	}
})

router.afterEach(to => {

})

export default router