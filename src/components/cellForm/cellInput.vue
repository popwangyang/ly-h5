<template>
	<van-field 
	v-model="value" 
	clearable
	:type="type"
	@input="onInput"
	:maxlength="maxlength"
	input-align="right"
	:placeholder="placeholder">
		<span slot="label">
			<span>{{title}}</span>
			<span v-if="!required" style="color: gray;margin-left: 4px;">(选填)</span>
		</span>
	</van-field>
</template>

<script>
	export default{
		props:{
			maxlength:{
				type: Number,
				default: 99999
			},
			title:{
				type: String,
				default: '标题'
			},
			type:{
				type: String,
				default: 'text'
			},
			required:{
				type: Boolean,
				default: true
			},
			placeholder:{
				type: String,
				default: '请输入'
			},
			modelValue:{
				type: [String, Number]
			}
		},
		model:{
			prop: 'modelValue',
			event: 'returnBack'
		},
		data(){
			return{
				value: ''
			}
		},
		watch:{
			modelValue(newValue){
				if(this.value) return;
				this.value = newValue;
			}
		},
		methods:{
			onInput(val){
				this.$emit('returnBack', val);
			}
		},
		mounted() {
			this.value = this.modelValue;
		}
	}
</script>

<style>
	.van-field .van-cell__title{
		flex: 3;
	}
	.van-field .van-cell__value{
		flex: 4;
	}
</style>
