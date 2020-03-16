import axios from '@/libs/api.request'

// 提现记录
export const getlist = (params) => {
  return axios.request({
    url: `/order/withdrawal-record`,
    params,
    method: 'get'
  }).then(res => {
    return new Promise((resolve) => {
      resolve({
        data: res.data.results,
        total: res.data.count
      })
    })
  })
}

// 【提现】提现确认/取消
export const withdrawalRecord = (id, status) => {
  return axios.request({
    url: `/order/withdrawal-record/${id}`,
    params: {
      status
    },
    method: 'get'
  })
}

// 第三方平台设置查询
export const getPayment_channel_rate = () => {
  return axios.request({
    url: '/ktv/place/third-party-platform',
    params: {},
    method: 'get'
  })
}

// 提现确认接口
export const withdrawalApi = (amount, user_id) => {
  return axios.request({
    url: `/order/withdrawal-record`,
    data: {
      amount,
      user_id
    },
    method: 'post'
  })
}
