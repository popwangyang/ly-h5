<template>
	<div class="selectedBox">
		<span class="fileMenu" @click="btnClick">
			<span v-if="text">{{text}}</span>
			<span style="color: gainsboro;" v-else>{{placeholder}}</span>
		</span>
	</div>
</template>

<script>
	export default{
		props:{
		    text:{
				type:String
			},
			placeholder:{
				type:String,
				required: true
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			btnClick(){
				this.$emit('btnClick');
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.selectedBox{
		.fileMenu{
			font-size: 14px;
			&>span:nth-child(1){
				display: inline-block;
				margin-right: 6px;
				position: relative;
				&::after{
					position: absolute;
					    top: 50%;
					    right: -14px;
					    margin-top: -5px;
					    border: 3px solid;
					    border-color: transparent transparent currentColor currentColor;
					    -webkit-transform: rotate(-45deg);
					    transform: rotate(-45deg);
					    opacity: 0.8;
					    content: '';
				}
			}
			
		}
	}
</style>
