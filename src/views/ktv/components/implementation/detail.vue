<template>
	<div class="implementationBox">
		<ContentLoad
		:getInfo='getData'
		>
		<span slot="empty">
			<Empty text="暂无实施信息" title="创建实施信息" @eventBtn="createBtn"/>
		</span>
		  <van-cell title="VOD品牌" value-class="cellValue" :value="vod"/> 
		  <van-cell title="实施包厢数" value-class="cellValue" :value="formData.box"/> 
		  <van-cell title="软件系统版本号" value-class="cellValue" :value="formData.version"/> 
		  <van-cell title="VOD场所ID" value-class="cellValue" :value="formData.vod_ktv_id"/> 
		  <van-cell title="网关" value-class="cellValue" :value="formData.gateway"/> 
		  <van-cell title="服务器" value-class="cellValue" :value="formData.server"/> 
		  <div class="divider"></div>
		  <van-cell title="是否使用版权盒" value-class="cellValue" :value="formData.is_use | isUseFilter"/>
		  <van-cell title="通讯模式" value-class="cellValue" :value="formData.communication_mode | communicationModeFilter"/>
		  <van-cell title="VOD Sever地址" value-class="cellValue" :value="formData.vod_server"/>
		  <van-cell title="AD  MAC 地址" value-class="cellValue" :value="formData.ad_mac"/>
		  <div class="divider"></div>
		  <van-cell title="格式及分辨率" is-link  @click="goSetting('formatResolution')">
			   <span  v-if="!hasFR">未填写</span>
		  </van-cell>
		  <van-cell title="二维码投射坐标" is-link  @click="goSetting('QRCode')">
			  <span v-if="!hasQR">
				  <span>未填写</span>
			  </span>
		  </van-cell>
		  <van-cell title="包厢信息" is-link  @click="goSetting('boxInformation')">
			  <span v-if="!hasSync">
			  	  <span>未同步</span>
			  </span>
		  </van-cell>
		  <div class="button">
		  	<van-button class="buttonDefault" size="large" @click="editedClick">编辑</van-button>
		  </div>
		</ContentLoad>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import Empty from '@/components/EmptyComponent'
	import ContentLoad from '@/components/contentLoad'
	export default{
		components:{
			ContentLoad,
			Empty
		},
		data(){
			return{
				formData:{
					vod:''
				}
			}
		},
		filters:{
			isUseFilter(state){
				return state == 1 ? "是":"否";
			},
			communicationModeFilter(state){
				return state == 1 ? "VOD直连网云端":"VOD连接娱网AD";
			},
		},
		computed:{
			hasSync(){
				return this.$store.state.ktv.firstSet == 0 ? false:true;
			},
			hasFR(){
				return !!this.$store.state.ktv.resolutionFormat;
			},
			hasQR(){
				if(this.$store.state.ktv.QRCode.qr_tv && this.$store.state.ktv.QRCode.qr_tv.length == 1){
				    return true;
				}else{
					return false;
				}
			},
			vod(){
				let result = ''
				this.$store.state.ktv.vodBandsList.forEach(item => {
					if(this.formData && item.id == this.formData.vod){
						result = item.brand
					}
				})
				return result;
			}
		},
		methods:{
			...mapActions([
				'ImplementationInfo'
			]),
			editedClick(){
				this.$router.push({
					name: 'implementation',
					query: {
						isEdited: true
					}
				})
			},
			goSetting(pageName){
				if(!this.hasFR && pageName == 'QRCode'){
				  this.$toast('请先填写格式及分辨率信息')	
				  return;
				}
				this.$router.push({
					name: pageName
				})
			},
			createBtn(){
				this.$router.push({
					name: 'implementation'
				})
			},
			getData(){
				return new Promise((resolve, reject) => {
					let send_data = {
						ktvID: this.$store.state.ktv.ktvID,
						vodID: this.$store.state.ktv.vodID
					}
					this.ImplementationInfo(send_data).then(res => {
						if(res != ""){
							Object.keys(res[0]).map(item => {
								if(res[0][item] !== ""){
									this.formData[item] = res[0][item]
								}else{
									this.formData[item] = "无";
								}
							})
						}
						resolve(res)
					}).catch(err => {
						console.log(err)
						reject()
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.implementationBox{
		height: 100%;
		overflow: auto;
		.button{
			margin-top: 10px;
			padding: 0 10px;
		}
	}
</style>
