import axios from '@/libs/api.request'

// 获取套餐列表
export const getPackageList = (ktv_id, params) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${ktv_id}/packages`,
    params: {
      is_delete: false,
      ordering: '-weight',
      p_size: 10000,
      ...params
    },
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

// 修改套餐外信息
export const modiCombo = (quary, data) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${quary.ktv_id}/packages/${quary.pk}`,
    method: 'put',
    data
  })
}

// 修改套餐内信息
export const modiInfoCombo = (quary, data) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${quary.ktv_id}/packages/${quary.pk}`,
    method: 'post',
    data
  })
}

// 修改套餐全部信息
export const modifyComboAll = (quary, data) => {
  return new Promise((resolve, reject) => {
    let p1 = modiCombo(quary, data.in);
    let p2 = modiInfoCombo(quary, data.out);
    Promise.all([p1, p2]).then(allRes => {
      let result = [...allRes];
      resolve(result);
    }).catch(err => {
      reject();
    })
  })
}



// 套餐批量管理
export const manaCombo = (quary, package_opts) => {
  return axios.request({
    url: `/ktv/pkg/ktvs/${quary.ktv_id}/packages/batch_manage`,
    method: 'put',
    data: {
      package_opts
    }
  })
}
