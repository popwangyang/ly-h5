<template>
	<div class="QRCodeBox">
		<cell-selected title="TV投射位置" :dataList="dataList1" v-model="formData.value1.value"/>
		<span class="spanBox transition" :class="{spanBox1: formData.value1.value == '2' ? true:false}">
			<cell-input title="屏幕X值" type="number" v-model="formData.value1.position.positionX"/>
			<cell-input title="屏幕Y值" type="number" v-model="formData.value1.position.positionY"/>
		</span>
		<div class="divider"></div>
		<cell-selected title="点歌器投射位置(横屏)" :dataList="dataList2" v-model="formData.value2.value"/>
		<span class="spanBox transition" :class="{spanBox1: formData.value2.value == '1' ? true:false}">
			<cell-input title="屏幕X值" type="number" v-model="formData.value2.position.positionX"/>
			<cell-input title="屏幕Y值" type="number" v-model="formData.value2.position.positionY"/>
		</span>
		<div class="divider"></div>
		<cell-selected title="点歌器投射位置(竖屏)" :dataList="dataList3" v-model="formData.value3.value"/>
		<span class="spanBox transition" :class="{spanBox1: formData.value3.value == '1' ? true:false}">
			<cell-input title="屏幕X值" type="number" v-model="formData.value3.position.positionX"/>
			<cell-input title="屏幕Y值" type="number" v-model="formData.value3.position.positionY"/>
		</span>
		<div class="button">
			<van-button  size="large" @click="btnClick" class="buttonDefault">保存</van-button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import ktvConfig from '@/config/ktvImplateData'
	import cellSelected from '@/components/cellForm/cellSelected'
	import cellInput from '@/components/cellForm/cellInput'
	import formValidate from '@/libs/validator'
	import { getPositionValue, setFormData } from '@/libs/util'
	export default{
		components:{
			cellSelected,
			cellInput
		},
		data(){
			const validateValue1 = (value, data) => {
				if(value.value == ''){
					return 'TV投射位置不能为空';
				}else{
					if(value.value == '2'){
						if(value.position.positionX == '' || value.position.positionY == ''){
							return 'TV投射位置坐标不完善';
						}else{
							if(value.position.positionX < 0 || value.position.positionX > this.TVWidth){
								return `TV投射位置X坐标的范围为0~${this.TVWidth}`;
							}
							if(value.position.positionY < 0 || value.position.positionY > this.TVHeight){
								return `TV投射位置Y坐标的范围为0~${this.TVHeight}`;
							}
						}
					}
				}
			}
			const validateValue2 = (value, data) => {
				if(value.value == ''){
					return '点歌器投射位置(横屏)不能为空';
				}else{
					if(value.value == '1'){
						if(value.position.positionX == '' || value.position.positionY == ''){
							return '点歌器投射位置(横屏)坐标不完善';
						}else{
							if(value.position.positionX < 0 || value.position.positionX > this.VODWidth){
								return `点歌器投射位置(横屏)X坐标的范围为0~${this.VODWidth}`;
							}
							if(value.position.positionY < 0 || value.position.positionY > this.VODHeight){
								return `点歌器投射位置(横屏)Y坐标的范围为0~${this.VODHeight}`;
							}
						}
					}
				}
			}
			const validateValue3 = (value, data) => {
				if(value.value == ''){
					return '点歌器投射位置(竖屏)不能为空';
				}else{
					if(value.value == '1'){
						if(value.position.positionX == '' || value.position.positionY == ''){
							return '点歌器投射位置(竖屏)坐标不完善';
						}else{
							if(value.position.positionX < 0 || value.position.positionX > this.VODHeight){
								return `点歌器投射位置(竖屏)X坐标的范围为0~${this.VODHeight}`;
							}
							if(value.position.positionY < 0 || value.position.positionY > this.VODWidth){
								return `点歌器投射位置(竖屏)Y坐标的范围为0~${this.VODWidth}`;
							}
						}
					}
				}
			}
			
			return{
				VODfbl: this.$store.state.ktv.QRCode.vod_resolution, // vod分辨率
				TVfbl: this.$store.state.ktv.QRCode.tv_resolution,  // TV分辨率
				formData: {
				  	value1: {
						value: '0',
						position:{
							positionX: '',
							positionY: ''
						}
					},
				  	value2: {
						value: '0',
						position:{
							positionX: '',
							positionY: ''
						}
					},
				  	value3: {
						value: '0',
						position:{
							positionX: '',
							positionY: ''
						}
					},
					
				},
				rules:{
					value1:[
						{ required: true, validate: validateValue1 }
					],
					value2:[
						{ required: true, validate: validateValue2 }
					],
					value3:[
						{ required: true, validate: validateValue3 }
					]
				}
			}
		},
		computed:{
			TVWidth(){
				if(this.TVfbl == '1'){
					return 1280;
				}else if(this.TVfbl == '3'){
					return 1920;
				}else{
					return 0;
				}
			},
			TVHeight(){
				if(this.TVfbl == '1'){
					return 720;
				}else if(this.TVfbl == '3'){
					return 1080;
				}else{
					return 0;
				}
			},
			VODWidth(){
				if(this.VODfbl == '1'){
					return 1280;
				}else if(this.VODfbl == '3'){
					return 1920;
				}else{
					return 0;
				}
			},
			VODHeight(){
				if(this.VODfbl == '1'){
					return 720;
				}else if(this.VODfbl == '3'){
					return 1080;
				}else{
					return 0;
				}
			},
			dataList1(){
				if(this.TVfbl == '1'){
					return ktvConfig.TV720P;
				}else if(this.TVfbl == '3'){
					return ktvConfig.TV1080P;
				}else{
					return [];
				}
			},
			dataList2(){
				if(this.VODfbl == '1'){
					return ktvConfig.SH720P;
				}else if(this.VODfbl == '3'){
					return ktvConfig.SH1080P;
				}else{
					return [];
				}
			},
			dataList3(){
				if(this.VODfbl == '1'){
					return ktvConfig.SV720P;
				}else if(this.VODfbl == '3'){
					return ktvConfig.SV1080P;
				}else{
					return [];
				}
			},
		},
		methods:{
			...mapActions([
				'handlerSetQRCode'
			]),
			setPosition(data, position, list){
				data.value = getPositionValue(position, list);
				if(data.value == list[list.length -1].value){
					data.position = {
							positionX: position.x.toString(),
							positionY: position.y.toString()
						}
				}
				console.log(data)
			},
			btnClick(){
				formValidate(this.formData, this.rules).then(res => {
					if(res){
						let sendData = {
							ktv_id: this.$store.state.ktv.ktvID,
							tv:[
								setFormData(this.formData.value1, this.dataList1, { type: 1, width: this.TVWidth})
							],
							vod:[
								setFormData(this.formData.value2, this.dataList2, { type: 2, width: '横'}),
								setFormData(this.formData.value3, this.dataList3, { type: 2, width: '竖'})
							]
						}
						this.$toast.loading({
						  duration: 0, // 持续展示 toast
						  forbidClick: true,
						  message: '修改中...'
						});
						this.handlerSetQRCode(sendData).then(res => {
						    this.$toast.success('修改成功');
							setTimeout(() => {
								this.$router.go(-1);
							}, 1000)
						}).catch(err => {
							this.$toast('修改失败，请稍后重试');
						})
						console.log(sendData)
					}
				})
			}
		},
		mounted() {
			if(this.$store.state.ktv.QRCode.qr_tv && this.$store.state.ktv.QRCode.qr_tv.length == 1){
				let data = this.$store.state.ktv.QRCode;
				let arr = [data.qr_tv[0], ...data.qr_vod]
				console.log(arr)
				Object.keys(this.formData).map((item, index) => {
					let list;
					if(index == 0){
						list = this.dataList1
					}else if(index == 1){
						list = this.dataList2
					}else{
						list = this.dataList3
					}
					this.setPosition(this.formData[item], arr[index], list);
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.QRCodeBox{
		.transition{
			transition: all 0.5s ease;
		}
		.spanBox{
			height: 0px;
			display: block;
			overflow: hidden;
		}
		.spanBox1{
			height: 88px;
			display: block;
		}
		.button{
			margin-top: 50px;
			padding: 0 10px;
			margin-bottom: 40px;
		}
	}
</style>
