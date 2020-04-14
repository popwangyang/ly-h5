<template>
	<div class="filterBox">
		<AreaFiter @onChange="areaChange"/>
		<StaticFilter @onChange="statuesChange"/>
	</div>
</template>

<script>
	import AreaFiter from './components/areaFilter'
	import StaticFilter from './components/statuesFilter.vue'
	export default {
	  components:{
		AreaFiter,
		StaticFilter
	  },
	  data() {
	    return {
			formData:{}
		}
	  },
	  methods: {
		  areaChange(data){
			Object.assign(this.formData, data);
			this.$emit('change', this.formData);
		  },
		  statuesChange(data){
			Object.assign(this.formData, data);
			this.$emit('change', this.formData);
		  },
	  }
	};
</script>
<style lang="less">
	.filterBox{
		.van-picker__cancel{
			color: gray;
		}
	}
</style>
<style scoped="scoped" lang="less">
	.filterBox{
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		height: 44px;
		border-top: 1px solid #ebedf0;
		border-bottom: 1px solid #ebedf0;
		
	}
</style>
