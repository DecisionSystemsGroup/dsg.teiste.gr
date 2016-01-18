var express = require('express');
var models = require('../models');
var utils = require('../utils');

var router = express.Router();

router.get('/dashboard/post', utils.requireLogin, function(req, res) {
  res.render('dashboard/post.jade', { csrfToken: req.csrfToken() });
});

router.post('/dashboard/post', utils.requireLogin, function(req, res) {
  var post = new models.Post({
    title:  req.body.title,
    name:   req.body.name,
    author:	req.session.user.username,
    text:	req.body.text
  });
  post.save(function(err) {
    if (err) {
      var error = 'Something bad happened! Please try again.';
      if (err.code === 11000) {
        error = 'That post name is already taken, please try another.';
		res.send(error);
      }
		res.send(error);
    } else {
      res.redirect('/post/'+post.name);
    }
  });
});

router.get('/dashboard/post/:name', utils.requireLogin, function(req, res) {
  res.send('Edw jade me form pou pernei vars gia na gemisei ta value tou form');
});
router.post('/dashboard/post/:name', utils.requireLogin, function(req, res) {
  //update to post
});

router.get('/post/:name', function(req, res) {
  models.Post.findOne({name: req.params.name}, '_id title author text', function(err, post) {
    if (!post) {
      res.render('user/post.jade', { error: "Invalid post name."  });
    } else {
		var createdAt = post._id.getTimestamp();
		res.render('user/post.jade', { post: post, createdAt: createdAt });
    }
  });
});
module.exports = router;
