import HttpRequest from '@/libs/axios'
import config from '@/config'

let baseUrl = null;
let socketUrl = null;


const url = window.location.href
if (url.indexOf('pro.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.pro
  socketUrl = config.socketUrl.pro
} else if (url.indexOf('test.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.test
  socketUrl = config.socketUrl.test
} else if (url.indexOf('dev.bjywkd.com') > -1) {
  baseUrl = config.baseUrl.dev
  socketUrl = config.socketUrl.dev
} else {
  baseUrl = config.baseUrl.test
  socketUrl = config.socketUrl.test
}

export const URL = baseUrl
export const wsk = 'wss://' + socketUrl + '/connection/websocket';
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
