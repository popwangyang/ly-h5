import axios from 'axios'
import store from '@/store'
import {
  getToken,
  setToken,
  throwError
} from './util'
import {
  Toast
} from 'vant'
import router from '../router'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,

      headers: {
        'Content-Type': 'application/json;'
      }

    }
    return config
  }

  interceptors(instance, skipUpdateToken, skipThrowError = false) {
    // 请求拦截

    instance.interceptors.request.use(config => {
      // 动态添加token
      let token = getToken(skipUpdateToken)
      if (token) {
        config.headers.Authorization = token;
      }

      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截

    instance.interceptors.response.use(response => {

      const {
        data,
        status
      } = response
      return {
        data,
        status
      }
    }, error => {
      const {
        data,
        status
      } = error.response
      if (status === 401 || status === 403) {
        setToken('')
        router.push({
          name: 'login'
        })
      }
      if (status == 400 && !skipThrowError) {
        throwError(data)
      }
      return Promise.reject({
        data,
        status
      })
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.skipUpdateToken, options.skipThrowError)
    return instance(options)
  }
}
export default HttpRequest
