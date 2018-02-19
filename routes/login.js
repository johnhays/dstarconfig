var express = require('express');
var router = express.Router();
var passport = require('passport');
var data = { title : "Login" };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', data);
});

router.post('/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;
