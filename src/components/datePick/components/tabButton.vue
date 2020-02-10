<template>
	<div class="tabBottomBox">
		<div :class="{datePickSelected: tabName == 1 ? true:false}" @click="btn(1)">按日</div>
		<div :class="{datePickSelected: tabName == 2 ? true:false}" @click="btn(2)">按年</div>
	</div>
</template>

<script>
	export default{
		props:{
			initTabValue:{
				type: Number,
				default: 1
			}
		},
		watch:{
			initTabValue(newValue){
				this.tabName = this.initTabValue
			}
		},
		data(){
			return{
				tabName: 1
			}
		},
		methods:{
			btn(index){
				this.tabName = index;
				this.$emit('event', index)
			}
		}
	}
</script>