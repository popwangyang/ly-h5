<template>
	<div>
		<van-cell title="账户类型" value="对私账户"/>
		<van-cell title="审核状态" >
		  <accout-tag :state="formData.state"></accout-tag>
		</van-cell>
		<span class="accountBoxTitle">
			用户信息
		</span>
		<van-cell title="用户类型" :value="formData.profession | filterUser"/>
		<van-cell title="姓名" :value="formData.name"/>
		<van-cell title="性别" :value="formData.gender | filterGender"/>
		<van-cell title="所在区域" :value="formData.area_code_list | filterArea"/>
		<van-cell title="详细地址" :value="formData.address"/>
		<van-cell title="身份证号" :value="formData.id_number"/>
		<van-cell title="身份证有效期">
			<span>
				<span>{{formData.identity_valid_from}}</span>
				<span> 至 </span>
				<span>{{formData.identity_valid_until}}</span>
			</span>
		</van-cell>
		<cell-image title="身份证照片" :dataList="formData.id_photos"/>
		<span class="accountBoxTitle">
			开户信息
		</span>
		<van-cell title="银行卡类型" :value="formData.bank_card_type | filterCard"/>
		<van-cell title="银行卡号" :value="formData.bank_card_number"/>
		<van-cell title="银行卡开户名" :value="formData.bank_account_name"/>
		<van-cell title="银行卡开户行" :value="formData.bank_name"/>
		<van-cell title="银行预留手机号" :value="formData.bank_reserve_mobile"/>
	</div>
</template>

<script>
	import { accountMixins } from '@/libs/mixins'
	import userData from '@/static/json/userData.json'
	import bankCardData from '@/static/json/bankCardData.json'
	import { filterArea } from '@/libs/util'
	export default{
		mixins: [ accountMixins ],
		filters:{
			filterArea: filterArea, // 过滤地区
			filterUser(val) {
				/**
				 * 过滤用户分类
				 */
				return userData[val]
			},
			filterCard(val) {
				/**
				 * 过滤银行卡类型
				 */
				return bankCardData[val]
			},
			filterGender(val) {
				/* 
				 性别过滤器
				 */
			    return val == 'MALE' ? '男':'女';
			}
		},
		data(){
			return{
				formData:{
					name: "",
					telephone: '',
					id_number: "",
					id_photos: [],
					bank: "",
					bank_card_number: "",
					state: '',
					profession: '',
					area_code_list: [],
					address: '',
					identity_valid_from: '',
					identity_valid_until: '',
					bank_reserve_mobile: '',
					bank_name: '',
					bank_account_name: '',
					bank_card_type: ''
				}
			}
		},
	}
</script>
