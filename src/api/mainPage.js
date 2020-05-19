import axios from '@/libs/api.request'

// 用户账户余额;
export const userAmount = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/user-amount`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}

// 累计分成金额;
export const orderShareTotalAmount = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/order-share-total-amount`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 用户总数;
export const getPersonNumber = (date) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/product-statistics/user-day-data`,
      params: {
        date: date || ''
      },
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 分润数据查询
export const profitInquiry = (params) => {
  return new Promise((resolve) => {
    return axios.request({
      url: `/order/user-royalty-statistics`,
      params: Object.assign(params, {
        data_type: 'nation' // 与后台已确认均传入此标识
      }),
      method: 'get'
    }).then(res => {
      resolve(res)
    })
  })
}

// 订单统计查询
export const orderMainData = (params) => {
  return new Promise((resolve) => {
    return axios.request({
      url: `/order/order-statistics`,
      method: 'get',
      params,
    }).then(res => {
      resolve(res)
    })
  })
}

// 日分成金额;
export const dayRoyalty = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/order-day-royalty`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    })
  })
}

// 日订单数量;
export const orderDayStatistics = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/order-day-statistics`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 月分成金额;
export const monthRoyalty = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/order-month-royalty`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 月订单数量;
export const orderMonthStatistics = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/order-month-statistics`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 订单数据统计汇总;
export const orderStatistics = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/order/order-statistics`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取城市开通、KTV接入、终端数;
export const getCityKTVIterm = (params) => {
  return new Promise((resolve, reject) => {
    return axios.request({
      url: `/ktv/place/statistics-place`,
      params,
      method: 'get'
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
