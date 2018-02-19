var fs = require('fs');
var path = "/proc/device-tree/hat";

function trimNull(a) {
  var c = a.indexOf('\0');
  if (c>-1) {
    return a.substr(0, c);
  }
  return a;
}

var hatRead = function() {
	var hat = {}; 
	if (fs.existsSync(path)) {
		var items = fs.readdirSync(path);
		for (var i=0; i<items.length; i++) {
			var filename = path + "/" + items[i];
			var value = fs.readFileSync(filename).toString().trim();
			hat[items[i]] = trimNull(value);
		}
	}
	return hat;
}

module.exports = hatRead;
