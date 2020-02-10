import { 
	getKtvDetail, 
	getImplementationInfo, 
	patchResolutionFormat,
	addResolutionFormat,
	setQRCode, 
	getVodBands 
} from '@/api/ktv'
export default {
  state: {
    ktvID: '',
	vodID: '',
	contractDetail: {},  // 合同详情
	implementID: '',  // 实施信息ID
	firstSet: 0,  // 实施信息包厢信息是否同步 0:首次创建 1:修改标识
	billingState: 1,  // 场所计费状态 1：开始 2：终止
	vodBandsList: [],  // Vod品牌列表
	implementInfo: '',  // 实施信息具体内容
	QRCode: {},   // 二维码位置
	resolutionFormat: {},    // 格式以及分辨率
	boxInfoList: []  // 实施包厢列表
  },
  getters: {
    
  },
  mutations: {
	  setKtvID(state, id){
		  state.ktvID = id;
	  },
	  setVodID(state, id){
		  state.vodID = id;
	  },
	  setVodBandsList(state, list){
	  		  state.vodBandsList = list;
	  },
	  setImplementationDetail(state, detail){
		  state.implementInfo = detail
	  },
	  setResolutionFormat(state, data){
		  state.resolutionFormat = data
	  },
	  setQRCode(state, data){
		  state.QRCode = data
	  },
	  setBoxInfoList(state, list){
		  state.boxInfoList = list
	  },
	  setBillingState(state, key){
		  state.billingState = key;
	  },
	  setImplementID(state, id){
	      state.implementID = id;
	  },
	  setBoxInfoFirstSet(state, flag){
		  state.firstSet = flag;
	  },
	  setContractDetail(state, contractDetail){
		  state.contractDetail = contractDetail;
	  }
  },
  actions: {
	KtvDetail({ commit }, id ){
		return new Promise((resolve, reject) => {
			getKtvDetail(id).then(res => {
				let detailData = res.data;
				commit('setVodID', detailData.vod_id);
				
				resolve(detailData);
			})
		})
	},
	vodBands({ commit }) {
		return new Promise((resolve, reject) => {
			getVodBands().then(res => {
				let list = res.data.results;
				commit('setVodBandsList', list);
				resolve();
			})
		})
	},
	ImplementationInfo({ commit }, sendData ){
		return new Promise((resolve, reject) => {
			getImplementationInfo(sendData).then(res => {
				if(res){
					let implementInfo = res[0];
					let resolutionFormat = res[1].data.results[0];
					let QRCodeInfo = res[2].data.data;
					let boxInfoList = res[3].data.data;
					if(resolutionFormat){
						QRCodeInfo.tv_resolution = resolutionFormat.tv_resolving;
						QRCodeInfo.vod_resolution = resolutionFormat.vod_resolving;
					}
					
					commit('setImplementID', implementInfo.id)
					commit('setBoxInfoFirstSet', implementInfo.first_set)
					commit('setImplementationDetail', implementInfo)
					commit('setResolutionFormat', resolutionFormat)
					commit('setQRCode', QRCodeInfo)
					commit('setBoxInfoList', boxInfoList)
					resolve(res);
				}
				resolve('');
			}).catch(err => {
				reject(err);
			})
		})
	},
	handlerAddResolutionFormat({ commit }, sendData){
		return new Promise((resolve, reject) => {
			addResolutionFormat(sendData).then(res => {
				commit('setResolutionFormat', sendData)
				resolve()
			}).catch(err => {
				reject(err)
			})
		})
	},
	handlerPatchResolutionFormat({ commit }, sendData){
		return new Promise((resolve, reject) => {
			patchResolutionFormat(sendData).then(res => {
				commit('setResolutionFormat', sendData)
				resolve()
			}).catch(err => {
				reject(err)
			})
		})
	},
	handlerSetQRCode({ commit }, sendData){
	   return new Promise((resolve, reject) => {
	   	setQRCode([sendData]).then(res => {
	   		commit('setQRCode', sendData)
	   		resolve()
	   	})
	   })
	}
  }
}