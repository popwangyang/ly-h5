import theme from '@/config/theme'
import {
  unRead
} from '@/api/information'

export default {
	state: {
		keepAliveList: [],
		theme: theme.themea,
		className: 'themea',
		unreadNum: '',
		undeliveredNum:0,
		unReadTimer: null,
		scrollTops: {},
	},
	mutations: {
		// 设置未配送的订单的数量
		setUndelivered(state, num){
			state.undeliveredNum = num;
			state.theme.tabBottoms.forEach(item => {
				if(item.path == '/orderManagement'){
					item.info = num;
				}
			})
		},
		SET_KEEPALIVE(state, list) {
			state.keepAliveList = list;
		},
		SET_UNREAD(state, unreadNum) {
			state.unreadNum = unreadNum;
			state.theme.tabBottoms.forEach(item => {
				if(item.path == '/personalCenter'){
					item.info = unreadNum;
				}
			})
		},
		SET_SCROLLNAME(state, name) {
			if (!state.scrollTops[name]) {
				state.scrollTops[name] = 0;
			}
		},
		SET_SCROLLTOP(state, data) {
			state.scrollTops[data.name] = data.scrollTop;
		},
		SET_THEME(state, themeType) {
			switch (themeType) {
				case 'ktv':
					state.theme = theme.theme_ktv;
					state.className = 'themea';
					break;
				case 'platform':
				case 'agentibus':
				case 'employee':
					state.theme = theme.theme_platform;
					state.className = 'themea';
					break;
				case 'ktv_clerk':
					state.theme = theme.theme_ktv_clerk;
					state.className = 'themeb';
					break;
				default:
					state.theme = theme.themea;
			}
		}
	},
	actions: {
		getUnRead({ commit }) {
			return new Promise((resolve) => {
				unRead({}).then(res => {
					if (res.status >= 200 && res.status < 400) {
						commit('SET_UNREAD', res.data.data[0].unread_msg_count)
					}
					resolve()
				})
			})
		}
	}
}
