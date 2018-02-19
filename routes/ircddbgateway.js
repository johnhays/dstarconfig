var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var fs = require('fs');
var ini = require('ini');
var piModel = require('../resources/piModel')();
var hatRead = require('../resources/hatRead')();
var ircddbgatewayconf = '/etc/opendv/ircddbgateway';
const exec = require('child_process').exec;

var curConfStr = fs.readFileSync(ircddbgatewayconf, { encoding : "UTF-8" });
var ircddbgwconf = ini.parse(curConfStr);
/* GET home page. */
var title = "ircDDBGateway Basic Setup";
var data = { title: title, conf: ircddbgwconf, piModel : piModel, hat : hatRead };

router.get('/', isAuthenticated, function(req, res, next) {
  res.render('ircddbgateway', data);
});

router.post('/', isAuthenticated, function(req, res, next) {
        var x = req.body;
        for (var key in x) {
                if (x.hasOwnProperty(key)) {
                        ircddbgwconf[key] = x[key];
                }
        }
	var newconfig = ini.encode(ircddbgwconf);
	fs.writeFileSync(ircddbgatewayconf,newconfig);
	res.render('ircddbgateway', data);
	
});

module.exports = router;
function isAuthenticated(req, res, next) {
    if (typeof req.session.passport !== 'undefined' && req.session.passport.user )
        return next();

    res.redirect('/login');
}
