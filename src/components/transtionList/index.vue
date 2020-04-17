<template>
	<div>
		<transition-group
		name="list-complete"
		tag="div"
		>
			<slot></slot>
		</transition-group>
	</div>
</template>

<style>
	.list-complete-enter, .list-complete-leave-to{
	  opacity: 0;
	  /* transform: translateY(30px); */
	}
	.list-complete-leave-active {
	  position: absolute;
	}
</style>
