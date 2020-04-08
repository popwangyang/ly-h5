<template>
	<div class="filterBox">
		<AreaFiter></AreaFiter>
		<span></span>
	</div>
</template>

<script>
	import AreaFiter from './components/areaFilter'
	export default {
	  components:{
		AreaFiter  
	  },
	  data() {
	    return {}
	  },
	  methods: {}
	};
</script>

<style scoped="scoped" lang="less">
	.filterBox{
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		height: 40px;
		border-top: 1px solid #ebedf0;
		border-bottom: 1px solid #ebedf0;
		
	}
</style>
