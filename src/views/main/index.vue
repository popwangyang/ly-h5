<template>
	<div ref='scroll' class="mainPageBox">
		<KTVData v-if="isKtv"/>
		<ManagementData v-else/>
	</div>
</template>

<script>
	import KTVData from './KTVData'
	import ManagementData from './managementData'
	import { cacheMixins } from "@/libs/mixins";
	export default{
		name: "mainPage",
		mixins: [cacheMixins],
		components:{
			KTVData,
			ManagementData
		},
		computed:{
			isKtv(){
				return this.$store.state.user.usertype == 'ktv' ? true:false;
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.mainPageBox{
		height: 100%;
		overflow: auto;
	}
</style>