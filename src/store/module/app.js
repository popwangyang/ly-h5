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
    unReadTimer: null,
    scrollTops: {}
  },
  mutations: {
    SET_KEEPALIVE(state, list) {
      state.keepAliveList = list;
    },
    SET_UNREAD(state, unreadNum) {
      state.unreadNum = unreadNum;
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
          state.theme = theme.themec;
          state.className = 'themea';
          break;
        case 'platform':
        case 'agentibus':
        case 'employee':
          state.theme = theme.themea;
          state.className = 'themea';
          break;
        case 'vod':
        case 'industry_association':
        case 'advance_party':
        case 'music_copyright_society':
        case 'copyright_party':
          state.theme = theme.themeb;
          state.className = 'themeb';
          break;
        default:
          state.theme = theme.themea;
      }
    },
  },
  actions: {
    getUnRead({
      commit
    }) {
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
