var express = require('express');

var utils = require('../utils');

var router = express.Router();

/**
 * Render the home page.
 */
router.get('/', function(req, res) {
  res.render('user/index.jade');
});


/**
 * Render the dashboard page.
 */
router.get('/dashboard', utils.requireLogin, function(req, res) {
  res.render('dashboard.jade');
});


router.get('/user/:filename', function(req, res) {
  res.render('user/'+req.params.filename+'.jade');
});

module.exports = router;
