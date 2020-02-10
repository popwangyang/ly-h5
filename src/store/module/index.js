const path = require('path');
const files = require.context('./', false, /\.js$/);
const modules = {};
files.keys().forEach(key => {
	const name = path.basename(key, '.js');
	if(name != 'index'){
		modules[name] = files(key).default || files(key);
	}
})

export default modules
