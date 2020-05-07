import axios from '@/libs/api.request'



// 获取ktv列表;
export const getKTVList = (params) => {
	return new Promise((resolve, reject) => {
		axios.request({
		  url: `/ktv/place/ktv-upgrade`,
		  params,
		  method: 'get'
		}).then(res => {
			console.log(res)
			let results = {
				total: res.data.count,
				data: res.data.results
			}
			resolve(results)
		}).catch(err => {
			reject(err)
		})
	})
}

// 获取ktv详情
export const getKtvDetail = (id) => {
	// return new Promise((resolve, reject) => {
	// 	ktvDatail(id).then(ktvRes => {
	// 		// agentName(ktvRes.data.agent_id).then(agentRes => {
	// 		// 	ktvRes.data.agent_name = agentRes.data.name;
	// 		// 	resolve(ktvRes);
	// 		// })
	// 		resolve(ktvRes);
	// 	})
	// })
	return axios.request({
	  url: `/ktv/place/ktv-upgrade/${id}`,
	  method: 'get'
	})
}

const ktvDatail = (id) => {
	return axios.request({
	  url: `/ktv/place/ktv-upgrade/${id}`,
	  method: 'get'
	})
}

const agentName = (agent_id) => {
	return axios.request({
	  url: `/cperm/agentibus/${agent_id}`,
	  method: 'get'
	})
}


/* 
* ktv曲库合同新建 
 */

export const createContract = (data) => {
	return axios.request({
	  url: `/ktv/place/music-library-contract`,
	  data,
	  method: 'post'
	})
}

// 获取ktv合同列表
export const getContractList = (params) => {
	return new Promise((resolve, reject) => {
		axios.request({
		  url: `/ktv/place/contract`,
		  params,
		  method: 'get'
		}).then(res => {
			let priorityArr = [2, 1, 3, 4]; // 根据合同状态排序，合同已生效排在第一位
			res.data.results.sort((a, b) => {
				if(priorityArr.indexOf(a.state) > priorityArr.indexOf(b.state)){
					return 1;
				}else{
					return -1;
				}
			})
			let results = {
				total: res.data.count,
				data: res.data.results
			}
			resolve(results)
		}).catch(err => {
			reject(err)
		})
	})
}

/* 
 * 获取合同详情
 * @params{Number} type 合同类型, 1为曲库服务合同, 2为商户星盟
 * @params{Number} ID 合同id
 */
export const getContractDetail = (type, ID) => {
	return new Promise((resolve, reject) => {
		let ajax = null;
		if(type == 1){
			ajax = getQKcontractDetail;
		}else{
			ajax = getZHcontractDetail;
		}
		ajax(ID).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

/* 
 * 获取合同计费记录
 */
export const getAccountRecord = (params) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('pppp');
		}, 1000)
	})
	
}


/* 获取曲库服务合同详情
 * @params{Number} ID 合同id
 */
export const getQKcontractDetail = (ID) => {
	return axios.request({
	  url: `/ktv/place/music-library-contract/${ID}`,
	  method: 'get'
	})
}

/* 获取商户星盟合同详情
 * @params{Number} ID 合同id
 */
export const getZHcontractDetail = (ID) => {
	return axios.request({
	  url: `/ktv/place/comprehensive-contract/${ID}`,
	  method: 'get'
	})
}


/* 
 *开始计费
 * @params{Object} data 请求参数
 * @params{Number} id  KTV的id
 * */
export const billingSwitch = (data, id) => {
	return axios.request({
	  url: `/ktv/place/billing-switch/${id}`,
	  data,
	  method: 'patch'
	})
}


/* 
  审批流程查询,获取ktv合同审批列表
 */
export const getContractApprovalRecord = (params) => {
	return axios.request({
	  url: `/ktv/place/approval`,
	  params,
	  method: 'get'
	})
}

// 获取ktv活动列表
export const getActivityList = (params) => {
	return axios.request({
	  url: `/activities/ktv-activities`,
	  params,
	  method: 'get'
	})
}

// 获取账号信息
export const getAccountNumberInfo = (ktv_id) => {
	let p1 = getKtvAccountInfo(ktv_id);
	let p2 = getClerkAccountInfo(ktv_id);
	return Promise.all([p1, p2]);
}

// 获取ktv账号信息
export const getKtvAccountInfo = (ktv_id) => {
	return axios.request({
	  url: `/cperm/ktvs/${ktv_id}/user`,
	  method: 'get'
	})
}

// 获取服务员账号信息
export const getClerkAccountInfo = (ktv_id) => {
	return axios.request({
	  url: `/cperm/ktvs/${ktv_id}/clerks`,
	  method: 'get'
	})
}

/* 
 * 创建ktv账号信息
 * @params{Object} data ktv账号信息
 * @params{Number} ktv_id ktv的id
 * 
 */
export const createAccountNumberInfo = (data, ktv_id) => {
	return axios.request({
	  url: `/cperm/ktvs/${ktv_id}/user`,
	  data,
	  method: 'post'
	})
}


/* 
*  获取ktv账户信息
* @params{Number} ktv_id ktv的id
 */
export const getAccountInfo = (ktv_id) => {
	return axios.request({
	  url: `/cperm/ktvs/${ktv_id}/financial_account`,
	  method: 'get'
	})
}

/* 
*  创建ktv账户信息
*  @params{Object} data ktv信息
*  @params{Number} ktv_id ktv的id
 */
export const createAccountInfo = (data, ktv_id) => {
	return axios.request({
	  url: `/cperm/ktvs/${ktv_id}/financial_account`,
	  data,
	  method: 'post'
	})
}

/* 
 * 获取七牛云上传信息
  * @params{Number} id 上传文件的id
 */
export const getUploadFileInfo = (params) => {
	return axios.request({
	  url: `/ad/credential-download`,
	  params,
	  method: 'get'
	})
}

/* 
 *实施信息新增
 * 
 * 
 * */
export const addImplementation = (data) => {
	return axios.request({
	  url: `/ktv/place/implement`,
	  data,
	  method: 'post'
	})
}
/* 
 修改实施信息 
 */

export const editedImplementation = (data, id) => {
	return axios.request({
	  url: `/ktv/place/implement/${id}`,
	  data,
	  method: 'put'
	})
}


// 获取ktv实施信息的详情
export const getImplementationInfo = (send_data) => {
	return new Promise((resolve, reject) => {
		getImplementationDetail({
			ktv: send_data.ktvID
		}).then(res => {
			if(res.data.results.length > 0){
				let p1 = getResolutionFormat({ktv: send_data.ktvID});
				let p2 = getQRCode([send_data.ktvID]);
				let p3 = getBoxInfoList({
					id: send_data.ktvID
				});
				Promise.all([p1, p2, p3]).then(allRes => {
					let result = [res.data.results[0], ...allRes];
					resolve(result);
				}).catch(err => {
					reject();
				})	
			}else{
				resolve('');
			}
		}).catch((err) => {
			reject(err)
		})
	})
}

/* 
 * 获取vod品牌列表
 */
export const getVodBands = () => {
	return axios.request({
	  url: `/cperm/vods`,
	  method: 'get'
	})
}

// 获取ktv实施信息的详情
export const getImplementationDetail = (params) => {
	return axios.request({
	  url: `/ktv/place/implement`,
	  params,
	  method: 'get'
	})
}



// 获取ktv实施信息的格式以及分辨率
export const getResolutionFormat = (params) => {
	return axios.request({
	  url: `/ktv/place/implement-extend`,
	  params,
	  method: 'get'
	})
}

// 新增ktv实施信息的格式以及分辨率
export const addResolutionFormat = (data) => {
	return axios.request({
	  url: `/ktv/place/implement-extend`,
	  data,
	  method: 'post'
	})
}

// 修改ktv实施信息的格式以及分辨率
export const patchResolutionFormat = (data) => {
	let id = data.id;
	return axios.request({
	  url: `/ktv/place/implement-extend/${id}`,
	  data,
	  method: 'put'
	})
}

// 获取ktv实施信息的二维码坐标
export const getQRCode = (data) => {
	return axios.request({
	  url: `/ktv/ktv/qrcode_coordinate`,
	  data,
	  method: 'VIEW'
	})
}

// 修改ktv实施信息的二维码坐标
export const setQRCode = (data) => {
	return axios.request({
	  url: `/ktv/ktv/qrcode_coordinate`,
	  data,
	  method: 'post'
	})
}

// 同步ktv实施信息的包厢信息
export const syncBoxInfoList = (data) => {
	return new Promise((reslove, reject) => {
		putImplementation(data).then(res => {
			reslove(res)
		}).catch(err => {
			reject(err)
		})
	})
}

// 同步ktv实施信息的包厢信息
const putImplementation = (data) => {
	let id = data.id;
	delete data.id;
	return axios.request({
	  url: `/ktv/place/implement/${id}`,
	  data,
	  method: 'patch'
	})
}

// 获取ktv实施信息的包厢信息
export const getBoxInfoList = (params) => {
	return axios.request({
	  url: `/ktv/ktv/room`,
	  params,
	  method: 'get'
	})
}

// 修改ktv实施信息的包厢数据
export const patchBoxInfoList = (data) => {
	return axios.request({
	  url: `/ktv/ktv/room`,
	  data,
	  method: 'patch'
	})
}

// 场所计费状态更新记录
export const billingLog = (params) => {
	return axios.request({
	  url: `/ktv/place/billing-log`,
	  params,
	  method: 'get'
	})
}