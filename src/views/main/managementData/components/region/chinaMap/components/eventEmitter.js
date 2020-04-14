export const  EventEmitter = function(){
	this.event = {};
	this.keys = [];
}

EventEmitter.prototype.addListener = function (key, callback){
	if(this.hasKey(key)) return;
	this.keys.push(key);
	Object.defineProperty(this.event, key, {
		set: (newValue) => {
			callback(newValue)
		},
		enumerable: true,
		configurable: true
	})
}

EventEmitter.prototype.hasKey = function(key){
	return this.keys.indexOf(key) === -1 ? false:true;
}

EventEmitter.prototype.emit = function (key, params){
	if(!this.hasKey(key)) return;
	this.event[key] = params || null;
}

EventEmitter.prototype.removeListener = function(key, callback){
	if(!this.hasKey(key)) return;
	this.keys.splice(this.keys.indexOf(key), -1);
	delete this.event[key];
	callback();
}
