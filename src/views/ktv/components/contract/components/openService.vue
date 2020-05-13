<template>
	<div class="openServiceBox">
		<span v-for="(item, index) in service" :key="index">
			<div class="divider"></div>
			<van-cell title="开通服务" value-class="cellValue" :value="item.service_type | nameFileter" />
			<van-cell title="费用" value-class="cellValue" :value="item.charge | chargeFileter" />
			<van-cell title="有效年限" value-class="cellValue" v-if="item.effective_age != null" :value="item.effective_age | effectiveAgeFilter" />
			<van-cell title="接入日期" value-class="cellValue" :value="item.begin_date" />
			<van-cell title="结束日期" value-class="cellValue" :value="item.end_date" />
		</span>
	</div>
</template>

<script>
	export default{
		props:{
			service:{
				type: Array,
				default:() => []
			}
		},
		filters:{
			nameFileter(type){
				let result;
				switch(type){
					case 1:
					  result = '曲库内容服务使用服务';
					  break;
					case 2:
					  result = '曲库初装服务';
					  break;
					case 3:
					  result = 'CDN新歌服务';
					  break;
				}
				return result;
			},
			chargeFileter(price){
				return price + "元/包厢/年";
			},
			effectiveAgeFilter(age){
				return age + '年';
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.openServiceBox{
		
	}
</style>
