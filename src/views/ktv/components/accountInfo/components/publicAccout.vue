<template>
	<div>
		<van-cell title="账户类型" value="对公账户"/>
		<van-cell title="审核状态" >
		  <accout-tag :state="formData.state"></accout-tag>
		</van-cell>
		<span class="accountBoxTitle">
			工商信息
		</span>
		<van-cell title="商户类型" :value="formData.profession | filterBusiness"/>
		<van-cell title="工商登记名称" :value="formData.business_registration_name"/>
		<van-cell title="工商注册日期" :value="formData.business_registration_date"/>
		<van-cell title="营业执照注册号" :value="formData.business_license_registration_number"/>
		<van-cell title="营业执有效期" value="2019年10月1日-2020年10月1日"/>
		<cell-image title="营业执照附件"  :dataList="formData.business_license_accessory"/>
		<van-cell title="工商注册地址" :value="formData.area_code_list | filterArea"/>
		<span class="accountBoxTitle">
			法人信息
		</span>
		<van-cell title="法人姓名" :value="formData.name"/>
		<van-cell title="手机号" :value="formData.telephone"/>
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
	import businessData from '@/static/json/businessData.json'
	import bankCardData from '@/static/json/bankCardData.json'
	import { filterArea } from '@/libs/util'
	export default{
		mixins: [ accountMixins ],
		filters:{
			filterArea: filterArea, // 过滤地区
			filterBusiness(val) {
				/**
				 * 过滤商户分类
				 */
				console.log(val);
				return businessData[val]
			},
			filterCard(val) {
				/**
				 * 过滤银行卡类型
				 */
				return bankCardData[val]
			}
		},
		data(){
			return{
				formData:{
					business_registration_name: '',
					business_registration_date: '',
					business_license_registration_number: "",
					business_license_accessory: [],
					area_code_list: [],
					name: "",
					telephone: '',
					id_number: "",
					id_photos: [],
					bank: "",
					bank_card_number: "",
					identity_valid_from: '',
					identity_valid_until: '',
					state: '',
					profession: '',
					bank_card_type: '',
					bank_account_name: '',
					bank_name: '',
					bank_reserve_mobile: ''
				}
			}
		}
	}
</script>
