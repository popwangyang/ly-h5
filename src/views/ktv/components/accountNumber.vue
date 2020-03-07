<template>
	<div class="accountNumberBox">
		<ContentLoad
		:getInfo="getData"
		emptyText="尚未创建账号，请至PC端处理"
		>
			<div class="divider"></div>
			<van-cell title="账号ID" :value="formData.id"/>
			<van-cell title="手机号" :value="formData.phone"/>
			<van-cell title="邮箱地址" :value="formData.email"/>
			<van-cell title="创建日期" :value="formData.create_date"/>
			<div class="divider"></div>
			<van-cell title="状态">
			  <span v-if="formData.is_active" style="color: #2BC8D6;">
				  已启用
			  </span>
			  <span v-else>
				  已禁用
			  </span>
			</van-cell>
		</ContentLoad>
	</div>
</template>

<script>
	import ContentLoad from '@/components/contentLoad'
	import { getAccountNumberInfo } from '@/api/ktv'
	export default{
		components:{
			ContentLoad
		},
		data(){
			return{
				formData:{
					id: "",
					phone: "",
					email: "",
					create_date: "",
					is_active: '',
				}
			}
		},
		methods:{
			getData(){
				return new Promise((resolve, reject) => {
					getAccountNumberInfo(this.$store.state.ktv.ktvID).then(res => {
						if(res.data != ""){
							Object.keys(this.formData).map(item => {
								this.formData[item] = res.data[item]
							})
						}
						console.log(res, "pppppp")
						resolve(res.data);
					})
				})
			}
		}
	}
</script>

<style>
	.accountNumberBox{
	  height: 100%;
	}
</style>
