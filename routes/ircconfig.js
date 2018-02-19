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
	var uri = "/etc/opendv/ircddbgateway";
	switch (req.query.modFile) {
                case "Clear":
                        uri="./resources/ircreset.mod"
                        break;
                case "Reload":
                        uri="/etc/opendv/ircddbgateway"
                        break;
	}
	var curConfStr = fs.readFileSync(uri, { encoding : "UTF-8" });
	curConf = ini.parse(curConfStr);
	res.send(curConf);
});

module.exports = router;
