var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var fs = require('fs');
var ini = require('ini');
var piModel = require('../resources/piModel')();
var hatRead = require('../resources/hatRead')();
const exec = require('child_process').exec;
var title = "System Commands";
var actions = ['stop','start','restart','enable','disable'];
var subprocesses = [
	{process : "udrc" , title : "UDRC D-STAR Repeater"},
	{process : "ircddbgateway" , title : "ircDDBGateway"},
	{process : "ircnodedashboard" , title : "Gateway Dashboard"},
	{process : "dstarconfig" , title : "Configuration Tool"}
];
var data = { title: title, piModel : piModel, hat : hatRead, items : {subprocesses : subprocesses, actions : actions} };

Array.prototype.contains = function(elem) {
	for (var i in this) {
		if (this[i] == elem) return true;
	}
	return false;
}

router.get('/', isAuthenticated, function(req, res, next) {
	res.render('commands', data);
});

router.get('/udrc', isAuthenticated, function(req, res, next) {
	var action = req.query.command;
	if (actions.contains(action)) exec("systemctl " + action + " dstarrepeaterd@1");
	res.render('commands', data);
});
		
router.get('/ircddbgateway', isAuthenticated, function(req, res, next) {
        var action = req.query.command;
	if (actions.contains(action)) exec("systemctl " + action + " ircddbgatewayd");
	res.render('commands', data);
});

router.get('/ircnodedashboard', isAuthenticated, function(req, res, next) {
        var action = req.query.command;
	if (actions.contains(action)) exec("systemctl " + action + " ircnodedashboard");
	res.render('commands', data);
});

router.get('/dstarconfig', isAuthenticated, function(req, res, next) {
        var action = req.query.command;
	if (actions.contains(action)) exec("systemctl " + action + " dstarconfig");
	res.render('commands', data);
});

router.get('/reboot', isAuthenticated, function(req, res, next) {
	res.send("Rebooting ...");
	exec("reboot");
});

router.get('/upnp/eth0', isAuthenticated, function(req, res, next) {
	var action = req.query.command;
	if (actions.contains(action)) exec("/opt/nwdr/scripts/upnp.sh eth0 " + action );
});

router.get('/upnp/wlan0', isAuthenticated, function(req, res, next) {
	var action = req.query.command;
	if (actions.contains(action)) exec("/opt/nwdr/scripts/upnp.sh wlan0 " + action );
});


router.get('/setbcr', isAuthenticated, function(req, res, next) {
        exec("/opt/nwdr/scripts/set-udrc-bcr220.sh");
});

router.get('/setdr1x', isAuthenticated, function(req, res, next) {
        exec("/opt/nwdr/scripts/set-udrc-dr1x.sh");
});

router.get('/updatehosts', isAuthenticated, function(req, res, next) {
        exec("/opt/nwdr/scripts/pull-hosts.sh");
});

router.get('/updatedstarconfig', isAuthenticated, function(req, res, next) {
        exec("/opt/nwdr/scripts/update-dstarconfig.sh");
});

router.get('/updatedashboard', isAuthenticated, function(req, res, next) {
        exec("/opt/nwdr/scripts/update-ircnodedashboard.sh");
});


module.exports = router;

function isAuthenticated(req, res, next) {
    if (typeof req.session.passport !== 'undefined' && req.session.passport.user )
        return next();
    res.redirect('/login');
}
