<template>
	<div class="formatResolutionBox">
		<span class="formatResolutionBoxTitle">
			TV端
		</span>
		<cell-selected title="分辨率" :dataList="dataList1" v-model="formData.tv_resolving"/>
		<cell-selected title="视频格式" :dataList="dataList2" v-model="formData.tv_video"/>
		<cell-selected title="图片格式" :dataList="dataList3" v-model="formData.tv_picture"/>
		<!-- <cell-selected title="角标格式" :dataList="dataList4" v-model="formData.TV_mark_format"/> -->
		<span class="formatResolutionBoxTitle">
			点歌器端
		</span>
		<cell-selected title="分辨率" :dataList="dataList5" v-model="formData.vod_resolving"/>
		<cell-selected title="视频格式" :dataList="dataList6" v-model="formData.vod_video"/>
		<cell-selected title="图片格式" :dataList="dataList7" v-model="formData.vod_picture"/>
		<div class="button">
			<van-button size="large" @click="btnClick" class="buttonDefault">保存</van-button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import cellSelected from '@/components/cellForm/cellSelected'
	import ktvConfig from '@/config/ktvImplateData'
	import formValidate from '@/libs/validator'
	export default{
		components:{
			cellSelected
		},
		computed:{
			data(){
				return this.$store.state.ktv.resolutionFormat
			}
		},
		data(){
			return{
				dataList1: ktvConfig.tv_resolvingPower,
				dataList2: ktvConfig.video,
				dataList3: ktvConfig.tv_picture,
				dataList4: ktvConfig.tv_picture,
				dataList5: ktvConfig.vod_resolvingPower,
				dataList6: ktvConfig.video,
				dataList7: ktvConfig.vod_picture,				
				formData:{
					tv_resolving: "",
					tv_video: "",
					tv_picture: "",
					// TV_mark_format: "",
					vod_resolving: "",
					vod_video: "",
					vod_picture: "",
					id: ''
				},
				rules:{
					tv_resolving:[
						{ required: true, message: 'TV端分辨率不能为空'}
					],
					tv_video:[
						{ required: true, message: 'TV端视频格式不能为空'}
					],
					tv_picture:[
						{ required: true, message: 'TV端图片格式不能为空'}
					],
					// TV_mark_format:[
					// 	{ required: true, message: 'TV端角标格式不能为空'}
					// ],
					vod_resolving:[
						{ required: true, message: '点歌器端分辨率不能为空'}
					],
					vod_video:[
						{ required: true, message: '点歌器端视频格式不能为空'}
					],
					vod_picture:[
						{ required: true, message: '点歌器端图片格式不能为空'}
					],
				}
			}
		},
		methods:{
			...mapActions([
				'handlerPatchResolutionFormat',
				'handlerAddResolutionFormat'
			]),
			btnClick(){
				formValidate(this.formData, this.rules).then(res => {
					if(res){
						let text = "修改";
						let handerAjax = this.handlerPatchResolutionFormat;
						if(!this.data){
							this.formData.ktv = this.$store.state.ktv.ktvID;
							text = "创建";
							handerAjax = this.handlerAddResolutionFormat;
						}
						this.$toast.loading({
						  duration: 0, // 持续展示 toast
						  forbidClick: true,
						  message: `${text}中...`
						});
						handerAjax(this.formData).then(res => {
							this.$toast.success(`${text}成功`);
							setTimeout(() => {
								this.$router.go(-1);
							}, 1000)
						}).catch(err => {
							console.log(err)
							this.$toast(`${text}失败，请稍后重试`);
						})
					}
				})
			}
		},
		mounted() {
			console.log(this.data)
			if(!this.data) return;
		    Object.keys(this.formData).map(item => {
				this.formData[item] = this.data[item].toString()
			})
			console.log(this.formData)
		}
	}
</script>

<style scoped="scoped" lang="less">
	.formatResolutionBox{
		.formatResolutionBoxTitle{
			background: #f2f2f2fe;
			padding: 8px 16px;
			display: block;
		}
		.button{
			margin-top: 50px;
			padding: 0 10px;
			margin-bottom: 40px;
		}
	}
</style>
