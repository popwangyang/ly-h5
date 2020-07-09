import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import './static/style/index.less';
import 'vant/lib/index.css';
import './config/rem.js'
import * as filters from './libs/filters'
import axios from 'axios'
// import './registerServiceWorker'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

let time = new Date(); // 防止浏览器缓存，每次请求都是最新的config文件；
Vue.prototype.$axios.get(`config/config.json?code=${time.getTime()}`).then((res) => {
  window.$config = res.data; //设置成Vue的全局属性
  main();
}).catch((error) => {
  console.log(error);
  main();
})

const main = () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
