<template>
	<div class="accountBox">
		<ContentLoad
		:getInfo="getData"
		emptyText="暂无账户信息，请至PC端处理"
		>
			<component v-bind:is="component" :data="accountInfo"></component>
		</ContentLoad>
	</div>
</template>

<script>
	import PrivateAccout from './components/privateAccout.vue'
	import PublicAccout from './components/publicAccout.vue'
	import ContentLoad from '@/components/contentLoad'
	import { getAccountInfo } from '@/api/ktv'
	export default{
		
		components:{
			PublicAccout,
			PrivateAccout,
			ContentLoad,
			
		},
		data(){
			return{
				accountType: 'b2b', // 1为对公， 2为对私
				accountInfo: ''
			}
		},
		computed:{
			component(){
				// RIVATE_ACCOUNT = ('b2c','个人账号')
				// PUBLIC_ACCOUNT = ('b2b','企业对公户')
				return this.accountType == 'b2b' ? 'PublicAccout':'PrivateAccout';
			}
		},
		methods:{
			getData(){
				return new Promise((resolve, reject) => {
					getAccountInfo(this.$store.state.ktv.ktvID).then(res => {
						this.accountType = res.data.account_type
						this.accountInfo = res.data;
						console.log(this.accountInfo);
						resolve(res.data);
					})
				})
			}
		}
	}
</script>

<style>
	.accountBox .van-cell__value{
		text-align: right;
		flex: 2;
	}
</style>
<style lang="less">
	.accountBox{
		height: 100%;
		padding-bottom: 40px;
		.skeletonBox{
			margin-top: 20px;
		}
		.accountBoxTitle{
			background: #f2f2f2fe;
			padding: 8px 16px;
			display: block;
		}
	}
</style>
