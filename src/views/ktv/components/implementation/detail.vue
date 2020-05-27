<template>
	<div class="implementationBox">
		<ContentLoad
		:getInfo='getData'
		>
		<span slot="empty">
			<Empty text="暂无实施信息" :title="emptyTitle" @eventBtn="createBtn"/>
		</span>
		  <van-cell title="实施方式" value-class="cellValue" :value="formData.mode | modeFilter"/> 
		  <van-cell title="VOD品牌" value-class="cellValue" :value="vod"/> 
		  <van-cell title="实施包厢数" value-class="cellValue" :value="formData.box"/> 
		  <van-cell title="软件系统版本号" value-class="cellValue" :value="formData.version"/> 
		  <van-cell title="VOD场所ID" value-class="cellValue" :value="formData.vod_ktv_id"/> 
		  <van-cell title="是否使用版权盒" value-class="cellValue" :value="formData.is_use | isUseFilter"/> 
		  <van-cell title="网关" value-class="cellValue" :value="formData.gateway"/> 
		  <van-cell title="服务器" value-class="cellValue" :value="formData.server"/> 
		  <div class="divider"></div>
		  <van-cell title="通讯模式" value-class="cellValue" :value="formData.communication_mode | communicationModeFilter"/>
		  <van-cell title="VOD Sever地址" value-class="cellValue" :value="formData.vod_server"/>
		  <van-cell title="AD  MAC 地址" value-class="cellValue" :value="formData.ad_mac"/>
		  <van-cell value-class="YYLabel">
		  	<span slot="title">备注</span>
		  	<span class="remark">
		  		<TextOverflow
		  		:maxLength="40"
		  		:text="formData.remarks"
		  		/>
		  	</span>
		  </van-cell>
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
	import { actionsAuthority } from '@/libs/util'
	import Empty from '@/components/EmptyComponent'
	import ContentLoad from '@/components/contentLoad'
	import TextOverflow from '@/components/textOverflow'
	export default{
		components:{
			ContentLoad,
			Empty,
			TextOverflow
		},
		data(){
			return{
				ktv_implementation_info_edit: actionsAuthority('ktv_implementation_info_edit'), // 合同信息查询包含列表和详情
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
			modeFilter(type){
				return type == 1 ? "软件升级":"硬件更换";
			}
		},
		computed:{
			emptyTitle(){
				return this.ktv_implementation_info_edit ? '创建实施信息':'';
			},
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
		.YYLabel{
			flex: 2;
			text-align: left;
		}
		.button{
			margin-top: 10px;
			padding: 0 10px;
		}
	}
</style>
