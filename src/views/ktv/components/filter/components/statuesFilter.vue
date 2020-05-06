<template>
	<div class="statuesFileterBox">
		<Selected :text="result" placeholder="入场状态" @btnClick="btnClick"/>
		<van-popup v-model="show" position="bottom" :style="{ height: '300px' }">
			<van-picker 
			show-toolbar 
			:columns="columns" 
			:default-index="0"
			@cancel="onCancel"
			@confirm="onConfirm"
			 />
		</van-popup>
	</div>
</template>

<script>
	import Selected from './selected.vue'
	export default{
		components:{
			Selected
		},
		data(){
			return{
				show: false,
				result: '',
				columns:[
					'全部',
					'待实施',
					'已实施'
				]
			}
		},
		methods:{
			btnClick(){
				this.show = true;
			},
			onCancel(){
				this.show = false;
			},
			onConfirm(value, index){
				this.result = value == '全部' ? "":value;
				this.$emit('onChange', {implement_state: index == 0 ? '':index+1});
				this.show = false;
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.statuesFileterBox{
		
	}
</style>
