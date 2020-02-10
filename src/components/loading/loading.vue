<template>
	<div>
		<van-loading :color="color"/>
	</div>
</template>
<script>
	export default{
		computed:{
			color(){
				return this.$store.state.app.theme.color
			}
		}
	}
</script>


