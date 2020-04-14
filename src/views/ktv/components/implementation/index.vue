<template>
	<div class="implementationInputBox">
		<ContentLoad
		:getInfo='getData'
		>
		    <cell-selected title="实施方式" :dataList="methodList" v-model="formData.mode"/>
			<cell-selected title="VOD品牌" :dataList="vodBandsList" v-model="formData.vod"/>
			<cell-input title="实际包厢数" v-model="formData.box"/>
			<cell-input title="软件系统版本号" :maxlength="50" v-model="formData.version"/>
			<cell-input title="VOD场所ID" v-model="formData.vod_ktv_id"/>
			<van-cell title="是否使用版权盒">
				<span class="bqBox">
					<span :class="{bqText: formData.is_use}">{{banQuanBoxText}}</span>
					<span>
						<van-switch size="24px" v-model="formData.is_use" />
					</span>
				</span>
			</van-cell>
			<cell-input title="网关" :required="false" :maxlength="50" v-model="formData.gateway"/>
			<cell-input title="服务器" :required="false" :maxlength="50" v-model="formData.server"/>
			<div class="divider"></div> 
			<cell-selected title="通讯模式" :dataList="dataList2" v-model="formData.communication_mode"/>
			
			<span v-show="formData.communication_mode == 2">
				<cell-input title="VOD Sever地址" :required="false" :maxlength="100" placeholder="请输入" v-model="formData.vod_server"/>
				<cell-input title="AD MAC地址" :required="false" :maxlength="50" v-model="formData.ad_mac"/>
			</span>
			<cell-input 
			    :rows="3"
				title="备注" 
				placeholder="备注文子" 
				type="textarea" 
				inputAlign="left" 
				:clearable="false" 
				:showWordLimit="true" 
				:maxlength="500" 
				:required="false"  
				v-model="formData.remarks"/>
			<div class="button">
				<van-button class="buttonDefault" size="large" @click="btnClick">{{btnText}}</van-button>
			</div>
		</ContentLoad>
	</div>
</template>

<script>
	import ContentLoad from '@/components/contentLoad'
	import cellInput from '@/components/cellForm/cellInput'
	import cellSelected from '@/components/cellForm/cellSelected'
	import formValidate from '@/libs/validator'
	import { getImplementationDetail, addImplementation, editedImplementation } from '@/api/ktv'
	export default{
		components:{
			cellInput,
			cellSelected,
			ContentLoad
		},
		data(){
			const boxValidate = (value) => {
				let myrey = /^(500|[1-4]{0,1}\d{0,1}\d)$/;
				if(value === ''){
					return "包厢数不能为空";
				}else if(!myrey.test(value)){
					return "包厢数请输入0~500的正整数";
				}
			}
			return{
				checked:false,
				formData:{
					ktv: this.$store.state.ktv.ktvID,
					mode: '',
					vod: '',
					box: '',
					version: '',
					vod_ktv_id: '',
					gateway: '',
					server: '',
					is_use: false,
					communication_mode: this.$route.query.isEdited ? 2: '',
					vod_server: 'http://',
					ad_mac: '',
					remarks:'',
					id: ''
				},
				implementationID: '',
				methodList:[
					{
					   label: '软件升级',
					   value: '1'
					},
					{
					   label: '硬件更换',
					   value: '2'
					},
				],
				dataList1:[
					{
						label: '是',
						value: '1'
					},
					{
						label: '否',
						value: '2'
					},
				],
				dataList2:[
					{
						label: 'VOD直连网云端',
						value: '1'
					},
					{
						label: 'VOD连接娱网AD',
						value: '2'
					},
				],
				rules:{
					mode: [
					    { required: true, message: '实施方式不能为空'},	
					],
					vod: [
						{ required: true, message: 'VOD品牌不能为空'},
					],
					box:[
						{ required: true, validate: boxValidate},
					],
					version:[
						{ required: true, message: '软件系统版本号不能为空'}
					],
					vod_ktv_id:[
						{ required: true, message: 'VOD场所ID不能为空'}
					],
					gateway:[
						{ required: false, type: 'isGateway', message: '网关格式不正确'}
					],
					ad_mac:[
						{ required: false, type: 'isMac', message: 'Mac地址格式不正确'}
					],
					communication_mode:[
						{ required: true, message: '通讯模式不能为空'}
					]
				}
			}
		},
		watch:{
			'formData.communication_mode':{
				handler(newValue, oldValue){
					console.log(newValue, oldValue);
					if(newValue == 2){
						this.formData.vod_server = 'http://';
						this.formData.ad_mac = '';
					}
				},
				immediate: false
			}
		},
		computed:{
			banQuanBoxText(){
			  if(this.formData.is_use){
				  return "使用";
			  }else{
				  return "不使用";
			  }
			},
			isEdited(){
				return this.$route.query.isEdited ? true:false;
			},
			vodBandsList(){
			   let list = this.$store.state.ktv.vodBandsList;
			   return list.reduce((cur, next) => {
				   let obj = {
					   value: next.id,
					   label: next.brand
				   }
				   cur.push(obj);
				   return cur;
			   }, [])
			},
			btnText(){
				if(!this.isEdited){
					return "确认实施";
				}else{
					return '编辑';
				}
			}
		},
		methods:{
			btnClick(){
				formValidate(this.formData, this.rules).then((val) => {
					if(val){
						let send_data = {};
						    Object.keys(this.formData).map(item => {
								send_data[item] = this.formData[item]
							})
							send_data.is_use = send_data.is_use ? 1:2;
							if(send_data.communication_mode == 1){
								send_data.vod_server = 'http://';
								send_data.ad_mac = '';
							}
						if(this.isEdited){
							this.$toast.loading({
							  duration: 0, // 持续展示 toast
							  forbidClick: true,
							  message: '修改中...'
							});
							editedImplementation(send_data, this.formData.id).then(res => {
							   this.$toast.success('修改成功');
							   setTimeout(() => {
								   this.$router.go(-1);
							   }, 1000)
							}).catch(err => {
								let errText = '修改失败，请稍后重试';
								if(err.status == 400){
									errText = err.data.non_field_errors[0]
								}
								this.$toast(errText);
							})
						}else{
							this.$dialog.confirm({
							  title: '提示',
							  message: '是否已确认实施，请确认信息无误在提交'
							}).then(() => {
								this.$toast.loading({
								  duration: 0, // 持续展示 toast
								  forbidClick: true,
								  message: '创建中...'
								});
								addImplementation(send_data).then(res => {
									 this.$toast.success('创建成功');
									 setTimeout(() => {
										   this.$router.go(-1);
									 }, 1000)
								}).catch(err => {
									console.log(err)
									let errText = '创建失败，请稍后重试';
									if(err.status == 400){
										errText = err.data.non_field_errors[0]
									}
									this.$toast(errText);
								})
							}).catch(() => {});
						}
					}
				})
			},
			getData(){
				let send_data = {
					ktv: this.$store.state.ktv.ktvID
				}
				let keys = ['ktv'];
				return new Promise((resolve, reject) => {
					getImplementationDetail(send_data).then(res => {
						if(res.data.results.length > 0){
							let data = res.data.results[0]
							Object.keys(this.formData).map(item => {
								if(data[item] != '无' && keys.indexOf(item) == -1){
									this.formData[item] = data[item];
								}
							})
							this.formData.is_use = this.formData.is_use == 1 ? true:false;
						}
						resolve({})
					}).catch(err => {
						reject();
					})
				})
			}
		},
		mounted() {
			
		}
	}
</script>
<style scoped="scoped" lang="less">
	.implementationInputBox{
		height: 100%;
		.bqBox{
			display: flex;
			justify-content: flex-end;
			color: gainsboro;
			&>span:nth-child(1){
				margin-right: 10px;
			}
			.bqText{
				color: black;
			}
		}
		.button{
			margin-top: 50px;
			padding: 0 10px;
		}
	}
</style>
