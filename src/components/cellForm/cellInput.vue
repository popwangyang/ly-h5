<template>
	<van-field 
	ref="input"
	v-model="value" 
	:clearable="clearable"
	:type="type"
	:rows="rows"
	@input="onInput"
	@click="onClick"
	:maxlength="maxlength"
	:input-align="inputAlign"
	:show-word-limit="showWordLimit"
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
			rows:{
				type: Number,
				default: 1
			},
			inputAlign:{
			    type:String,
				default: 'right'
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
			},
			showWordLimit:{
			    type: Boolean,
				default: false
			},
			clearable:{
				type: Boolean,
				default: true,
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
			},
			onClick(){
				if(this.value.length > 0){
					this.$refs.input.$refs.input.setSelectionRange(this.value.length, this.value.length);
				}
			}
		},
		mounted() {
			this.value = this.modelValue == null ? '':this.modelValue;
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
