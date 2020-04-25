<template>
	<div class="accountNumberBox">
		<ContentLoad
		:getInfo="getData"
		emptyText="尚未创建账号，请至PC端处理"
		>
		    <span class="title">管理员账号</span>
			<!-- <div class="divider"></div> -->
			<van-cell title="账号ID" :value="ktvAccount.username"/>
			<van-cell title="手机号" :value="ktvAccount.phone"/>
			<van-cell title="邮箱地址" v-if="ktvAccount.email && ktvAccount.email != null" :value="ktvAccount.email"/>
			<van-cell title="创建日期" :value="ktvAccount.create_date"/>
			<div class="divider"></div>
			<van-cell title="状态">
			  <span v-if="ktvAccount.is_active" style="color: #2BC8D6;">
				  已启用
			  </span>
			  <span v-else>
				  已禁用
			  </span>
			</van-cell>
			<span v-if="hasKtvClerk">
				<span class="title">服务员账号</span>
				<!-- <div class="divider"></div> -->
				<van-cell title="账号ID" :value="ktvClerkAccount.username"/>
				<van-cell title="手机号" :value="ktvClerkAccount.phone"/>
				<van-cell title="邮箱地址" v-if="ktvClerkAccount.email && ktvClerkAccount.email != null" :value="ktvClerkAccount.email"/>
				<van-cell title="创建日期" :value="ktvClerkAccount.create_date"/>
				<div class="divider"></div>
				<van-cell title="状态">
				  <span v-if="ktvClerkAccount.is_active" style="color: #2BC8D6;">
					  已启用
				  </span>
				  <span v-else>
					  已禁用
				  </span>
				</van-cell>
			</span>
			
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
				ktvAccount:{
					id: "",
					phone: "",
					email: "",
					create_date: "",
					is_active: '',
					username: ''
				},
				
				ktvClerkAccount:{
					id: "",
					phone: "",
					email: "",
					create_date: "",
					is_active: '',
					username: ''
				},
				
				hasKtvClerk: false,
			}
		},
		methods:{
			getData(){
				return new Promise((resolve, reject) => {
					getAccountNumberInfo(this.$store.state.ktv.ktvID).then(res => {
						if(res.data != ""){
							Object.keys(this.ktvAccount).map(item => {
								this.ktvAccount[item] = res.data[item]
							})
							
							if(res.data.belong_participant && res.data.belong_participant.user){
								this.hasKtvClerk = true;
								Object.keys(this.ktvClerkAccount).map(item => {
									this.ktvClerkAccount[item] = res.data.belong_participant.user[item]
								})
							}
						}
						resolve(res.data);
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.accountNumberBox{
	  height: 100%;
	  .title{
		  height: 30px;
		  display: block;
		  padding: 0 16px;
		  line-height: 30px;
	  }
	}
</style>
