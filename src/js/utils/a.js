// export default {
// 	name: 'xixixi'
// }
// export const version = 1.0

(function(global, factory) {
	"use strict";
	if (typeof exports === 'object') {
		exports.myvar = 'xxxxx'
		module.exports = 'sssss';

		// exports['Amodule'] = factory()
		// console.log(module.exports)
	} else {
		global['Amodule'] = factory(global)
	}
})(this, function() {
	var name = 'xixiix'
	var version = 1.0
	return name
});
// module.exports.myvar = 'lala'
// module.exports.set = function(name) {
// 	this.name = name;
// }
// module.exports.get = function() {
// 	return this.name;
// }
// exports.var = 'sssss'