const baseSize = 14;
function setRem () {
	const scale = document.documentElement.clientWidth / 375 
	document.documentElement.style.fontSize = (baseSize * scale) + 'px'
}
setRem()
window.onresize = function() {
	setRem()
}
