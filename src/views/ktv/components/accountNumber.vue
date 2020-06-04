<template>
	<div class="accountNumberBox">
		<ContentLoad
		:getInfo="getData"
		emptyText="尚未创建账号，请至PC端处理"
		>
		    <span v-if="hasKtvAccount">
				<span class="title">管理员账号</span>
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
			</span>
		   
			<span v-for="item in clerksInfo" :key="item.id">
				<span class="title">服务员账号</span>
				<van-cell title="账号ID" :value="item.username"/>
				<van-cell title="手机号" :value="item.phone"/>
				<van-cell title="邮箱地址" v-if="item.email && item.email != null" :value="item.email"/>
				<van-cell title="创建日期" :value="item.create_date"/>
				<div class="divider"></div>
				<van-cell title="状态">
				  <span v-if="item.is_active" style="color: #2BC8D6;">
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
				clerksInfo:[],
				hasKtvAccount: false,
			}
		},
		methods:{
			getData(){
				return new Promise((resolve, reject) => {
					getAccountNumberInfo(this.$store.state.ktv.ktvID).then(res => {
						let ktvInfo = res[0].data;
						this.clerksInfo = res[1].data.results;
						if(ktvInfo != ""){
							this.hasKtvAccount = true;
							Object.keys(this.ktvAccount).map(item => {
								this.ktvAccount[item] = ktvInfo[item]
							})
						}
						let result = '';
						if(ktvInfo != '' || this.clerksInfo.length != 0){
							result = {};
						}
						resolve(result);
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
