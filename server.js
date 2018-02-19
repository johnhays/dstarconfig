var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ini = require('ini');
var fs = require('fs');
var hbs = require('hbs');
var rhn = require('./resources/reflectorHostNames');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var index = require('./routes/index');
var users = require('./routes/users');
var udrc = require('./routes/udrc');
var udrcconfig = require('./routes/udrcconfig');
var ircconfig = require('./routes/ircconfig');
var login = require('./routes/login');
var commands = require('./routes/commands');
var ircddbgateway = require('./routes/ircddbgateway');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'nw digital radio', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui-dist/'));

hbs.registerHelper('json', function(context) {
	return JSON.stringify(context);
});

hbs.registerHelper("switch", function(value, options) {
	this._switch_value_ = value;
	var html = options.fn(this); // Process the body of the switch block
	delete this._switch_value_;
	return html;
});

hbs.registerHelper("case", function(value, options) {
	if (value == this._switch_value_) {
		return options.fn(this);
	}
});

passport.use(new Strategy(
	function(username, password, cb) {
		db.users.findByUsername(username, function(err, user) {
			if (err) { return cb(err); }
			if (!user) { return cb(null, false); }
			if (user.password !== password) { return cb(null, false); } return cb(null, user);
		});
	}
));

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	db.users.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
});

app.use('/', index);
app.use('/udrc', udrc);
app.use('/ircddbgateway', ircddbgateway);
app.use('/users', users);
app.use('/udrcconfig',udrcconfig);
app.use('/ircconfig',ircconfig);
app.use('/commands',commands);

app.get('/reflector-list', function(req, res, next) {
	res.send(rhn());
});

app.get('/login', function(req, res, next){
	res.render('login');
});

app.post('/login',
	passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/geolocate', function(req, res, next) {
	res.set({'Content-Type': 'text/json'});
        http.get({host: "freegeoip.net",path:"/json/"}, function(response) {
		response.on('data', function(d){
			res.send(d.toString()); 
	        });
		response.on('error', function(e) {
			console.log(e);
			next();
		});
	});
});

app.get('/logout',
	function(req, res){
		req.logout();
		res.redirect('/');
});

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
	res.status(err.status || 500);
	res.render('error');
});
*/
module.exports = app;
