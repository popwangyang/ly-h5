import {EventEmitter} from './eventEmitter.js'

export const  Controller = function(){
	EventEmitter.call(this);
}

function content(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}

Controller.prototype = content(EventEmitter.prototype);

Controller.prototype.constructor = Controller;

Controller.prototype.setArea = function(name){
	this.emit("area", name);
}