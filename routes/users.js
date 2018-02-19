var express = require('express');
var router = express.Router();
var fs = require('fs');
var accounts = require('../db/accounts.json');
var title = "User Account";
var data = {title : title, accounts : accounts};

router.get('/', isAuthenticated, function(req, res, next) {
        res.render('users', data);
});

router.post('/', isAuthenticated, function(req, res, next) {
	accounts.pop();
	accounts.push(req.body);
        fs.writeFileSync('db/accounts.json',JSON.stringify(accounts,null,8) + "\n");
        res.render('users', {title : 'Account Posted', accounts : accounts});
});

module.exports = router;

function isAuthenticated(req, res, next) {
	if (typeof req.session.passport !== 'undefined' && req.session.passport.user )  return next();
	res.redirect('/login');
}

