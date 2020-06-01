import HttpRequest from '@/libs/axios'
import config from '@/config'
import {
  spring,
  NoTokenRefresh,
  getToken,
  setToken
} from '@/libs/util'

let baseUrl = null;
let socketUrl = null;


const url = window.location.href
if (url.indexOf('info.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.info
  socketUrl = config.socketUrl.info
} else if (url.indexOf('pro.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.pre
  socketUrl = config.socketUrl.pre
} else if (url.indexOf('test.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.test
  socketUrl = config.socketUrl.test
} else {
  baseUrl = config.baseUrl.test
  socketUrl = config.socketUrl.test
}

export const URL = baseUrl
export const wsk = 'wss://' + socketUrl + ':9112/connection/websocket';
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
