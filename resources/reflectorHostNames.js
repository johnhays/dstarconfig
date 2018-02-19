var fs = require('fs');
var dcshosts = '/usr/share/opendv/DCS_Hosts.txt';
var refhosts = '/usr/share/opendv/DPlus_Hosts.txt';
var xrfhosts = '/usr/share/opendv/DExtra_Hosts.txt';
var ccshosts = '/usr/share/opendv/CCS_Hosts.txt';
var names = [];
function addHosts(filename) {
	var value = fs.readFileSync(filename);
	var lines = value.toString().split('\n');
	for (line in lines) {
		var lin = lines[line].toString();
		var name = lin.split(/\s+/,1);
		var strname = name.toString();
		if (strname.match(/^RE[XF]|^DC[XS]|^XR[XF]/)){
			if (names.indexOf(strname) < 0) { 
				names.push(strname);
			}
		}
	}
}


var reflectorHostNames = function() {
	addHosts(refhosts);
	addHosts(dcshosts);
	addHosts(xrfhosts);
	return names;
}


// console.log(reflectorHostNames());
module.exports = reflectorHostNames;
