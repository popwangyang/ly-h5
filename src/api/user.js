import axios from '@/libs/api.request'

// 登录接口
export const login = ({
  username,
  password
}) => {
  const data = {
    username: username,
    password: password
  }
  return axios.request({
    url: '/cperm/token/get',
    data,
    method: 'post'
  })
}

// 获取用户类型(非登录状态)
export const getUserType = (params) => {
  return axios.request({
    url: `/cperm/users/user_type`,
    params,
    method: 'get',
  })
}

// 根据手机号或邮箱获取验证码
export const getIdentifyungCode = (data) => {
  return axios.request({
    url: '/cperm/send_code',
    method: 'post',
    data
  })
}


// 验证验证码
export const testIdentifyungCode = (data) => {
  return axios.request({
    url: '/cperm/verify_code',
    method: 'post',
    data
  })
}


// 修改密码(非登录状态)
export const ConfirmToModifyTheNewPassword = (data) => {
  return axios.request({
    url: '/cperm/user/change_password',
    method: 'post',
    data
  })
}

// 获取登录信息
export const getPersonMidInfo = () => {
  return axios.request({
    url: '/cperm/users/self',
    method: 'get',
  })
}


// 管理平台获取登录信息
export const getManaPersonMidInfo = () => {
  return axios.request({
    url: '/cperm/platform',
    method: 'get',
  })
}

// 获取平台user_id
export const getEmployee_user_id = () => {
  return axios.request({
    url: '/cperm/platform',
    method: 'get',
  })
}

// 根据原始密码修改新密码；
export const changePasswordapi = (username,
  password, old_password = null) => {
  return axios.request({
    url: '/cperm/user/change_password',
    method: 'post',
    data: {
      username,
      password,
      old_password
    }
  })
}

// 获取ktv登录信息
export const getKTVPersonMidInfo = (id) => {
  return axios.request({
    url: `/ktv/place/ktv-upgrade/${id}`,
    method: 'get',
  })
}

// 获取vod登录信息
export const getVodPersonMidInfo = (id) => {
  return axios.request({
    url: `/cperm/vods/${id}`,
    method: 'get',
  })
}
