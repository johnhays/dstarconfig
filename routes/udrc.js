var express = require('express');
var router = express.Router();
var fs = require('fs');
var ini = require('ini');
var piModel = require('../resources/piModel')();
var hatRead = require('../resources/hatRead')();
var dstarconfig1 = '/etc/opendv/dstarrepeater_1';
const exec = require('child_process').exec;
var title = "D-STAR Repeater/Hotspot Basic Setup";

var curConfStr = fs.readFileSync(dstarconfig1, { encoding : "UTF-8" });
var udrcconf = ini.parse(curConfStr);
var data = { title: title, conf: udrcconf, piModel : piModel, hat : hatRead };

router.get('/', isAuthenticated, function(req, res, next) {
	res.render('udrc', data);
});

router.post('/', isAuthenticated, function(req, res, next) {
        var x = req.body;
        for (var key in x) {
                if (x.hasOwnProperty(key)) {
                        udrcconf[key] = x[key];
                }
        }
	var newconfig = ini.encode(udrcconf);
//	console.log(newconfig);
	fs.writeFileSync(dstarconfig1,newconfig);
	res.render('udrc', data);
	
});

module.exports = router;
function isAuthenticated(req, res, next) {
    if (typeof req.session.passport !== 'undefined' && req.session.passport.user )
        return next();
    res.redirect('/login');
}
