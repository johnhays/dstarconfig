var express = require('express');
var router = express.Router();
var fs = require('fs');
var ini = require('ini');

function isAuthenticated(req, res, next) {
	if (typeof req.session.passport !== 'undefined' && req.session.passport.user )  return next();
	res.redirect('/login');
}

router.get('/', isAuthenticated, function(req, res, next) {
	var curConf = {};
	var uri = "/etc/opendv/dstarrepeater_1";
	switch (req.query.modFile) {
		case "bcr220":
			uri="./resources/bcr220.mod"
			break;
		case "dr1x-uhf":
			uri="./resources/dr1x-uhf.mod"
			break;
		case "dr1x-vhf":
			uri="./resources/dr1x-vhf.mod"
			break;
		case "other":
			uri="./resources/other.mod"
			break;
		case "Clear":
			uri="./resources/reset.mod"
			break;
		case "Reload":
			uri="/etc/opendv/dstarrepeater_1"
			break;
	}
	var curConfStr = fs.readFileSync(uri, { encoding : "UTF-8" });
	curConf = ini.parse(curConfStr);
	res.send(curConf);
});

module.exports = router;
