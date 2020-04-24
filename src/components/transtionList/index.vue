<template>
	<div class="transitionBox">
		<transition-group
		name="list-complete"
		tag="div"
		v-on:before-enter="beforeEnter"
		v-on:before-leave="beforeLeave"
		v-on:leave="leave"
		v-bind:css="false"
		>
			<slot></slot>
		</transition-group>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				boxHeight:0,
			}
		},
		methods:{
			beforeEnter(el){
				console.log(el);
			},
			enter(el, done){
				Velocity(
				  el,
				  { height: 'auto', padding: 0},
				  { duration: 200,},
				  { complete: done }
				)
			},
			beforeLeave(el){
				// let box = document.getElementsByClassName('transitionBox')[0];
				// this.boxHeight = box.style.height = box.offsetHeight;
			},
			leave(el, done){
				   Velocity(
				     el,
				     { opacity: 0},
				     { duration: 100 },
				   )
					Velocity(
					  el,
					  { height: '0px', padding:0, display:'none'},
					  { duration: 200,},
					  { complete: done }
					)
			}
		}
	}
</script>
<style lang="less">
	.list-complete-enter, .list-complete-leave-to{
	  opacity: 0;
	  /* transform: translateY(30px); */
	}
	.list-complete-leave-active {
	  position: absolute;
	}
</style>
