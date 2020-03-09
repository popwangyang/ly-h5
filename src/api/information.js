import axios from '@/libs/api.request'

// 实时获取消息
export const socket = (params) => {
  return axios.request({
    url: '/copyright/rbac/ws-token',
    method: 'get',
    params
  })
}

// 未读数量
export const unRead = () => {
  return axios.request({
    url: 'cperm/notice_msg/unread_count',
    method: 'get',
  })
}

// 消息列表
export const infoList = (
  p_index,
  p_size,
  state) => {
  return axios.request({
    url: 'cperm/notice_msg',
    method: 'get',
    params: {
      p_index,
      p_size,
      state
    }
  })
}

// 未读变已读
export const toRead = () => {
  return axios.request({
    url: '/cperm/notice_msg',
    method: 'patch',
    data: []
  })
}
