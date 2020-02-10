import Vue from 'vue'
import Vuex from 'vuex'
import modules from './module/index'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
        storage: window.localStorage
    })]
})
