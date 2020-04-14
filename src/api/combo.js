import axios from '@/libs/api.request'

// 获取套餐列表
export const getPackageList = (ktv_id) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${ktv_id}/packages`,
    params: {},
    method: 'get'
  })
}

// 获取套餐详情
export const getPackageDetail = (ktv_id, pk) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${ktv_id}/packages/${pk}`,
    params: {},
    method: 'get'
  })
}

/* 
 * 创建套餐
 */

export const createContract = (ktv_id, data) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${ktv_id}/packages`,
    data,
    method: 'post'
  })
}

// 删除套餐
export const deleCombo = (ktv_id, pk) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${ktv_id}/packages/${pk}`,
    method: 'delete'
  })
}

// 修改套餐
export const modiCombo = (quary, data) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${quary.ktv_id}/packages/${quary.pk}`,
    method: 'put',
    data
  })
}
