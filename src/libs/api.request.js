import HttpRequest from '@/libs/axios'
import config from '@/config'
import {
  spring,
  NoTokenRefresh,
  getToken,
  setToken
} from '@/libs/util'

let baseUrl = null;
let socketUrl = ''

const url = window.location.href
if (url.indexOf('info.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.info
} else if (url.indexOf('pre.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.pre
  socketUrl = 'wkpre.bjywkd.com'
} else if (url.indexOf('test.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.test
  socketUrl = 'wkceshi.bjywkd.com'
} else {
  baseUrl = config.baseUrl.dev
  socketUrl = 'wkceshi.bjywkd.com'
}

config.baseUrl.socket = 'wss://' + socketUrl + ':9112/connection/websocket'

export const URL = baseUrl
const Ajax = new HttpRequest(baseUrl)
const axios = {
  request: (option) => {
    return new Promise((resolve, reject) => {
      Ajax.request(option).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

// 传参为data 取参数用req.body, 传参为params， 取参为在URL中进行。
export default axios
