var express = require('express');
var models = require('../models');
var utils = require('../utils');
var error404 = "Make sure you typed the url correctly. <br /> If you came here from a link inside DSG, please contact us at dsg@teiste.gr";

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

router.get('/post/:name', function(req, res) {
  models.Post.findOne({name: req.params.name}, '_id title author text', function(err, post) {
    if (!post) {
      res.render('user/post.jade', { error: "there is no post name with that name.", solution: error404  });
    } else {
		var createdAt = post._id.getTimestamp();
		res.render('user/post.jade', { post: post, createdAt: createdAt });
    }
  });
});

//returns all the posts 
router.get('/dashboard/posts', utils.requireLogin, function(req, res) {
  models.Post.find({}, '_id title author name', function(err, posts) {
    if (!posts) {
      res.render('dashboard/posts.jade', { error: "No posts found.", solution: error404  });
    } else {
		// var createdAt = post._id.getTimestamp();
		res.render('dashboard/posts.jade', { posts: posts});
    }
  });
});
//return the data of a post to be edited
router.get('/dashboard/post/:name', utils.requireLogin, function(req, res) {
  models.Post.findOne({name: req.params.name}, '_id title author text name', function(err, post) {
    if (!post) {
      res.render('dashboard/editPost.jade', { error: "there is no post name with that name.", solution: error404  });
    } else {
		var createdAt = post._id.getTimestamp();
		res.render('dashboard/editPost.jade', { post: post, createdAt: createdAt, csrfToken: req.csrfToken()});
    }
  });
});
router.post('/dashboard/post/:name', utils.requireLogin, function(req, res) {
	var editedPost = {
		title:  req.body.title,
		name:  	req.body.name,
		author:	req.session.user.username,
		text:	req.body.text
	};
	models.Post.findOneAndUpdate({name: req.params.name}, editedPost, {}, function(err, doc){
		if(err){
			var error = 'Something bad happened! Please try again.';
			if (err.code === 11000) {
				error = 'That post name is already taken, please try another.';
				res.send(error);
			}
			res.send(error);
		}
		else
			res.redirect('/dashboard/post/'+req.body.name);
	});
});


// projects
//new project form
router.get('/dashboard/project', utils.requireLogin, function(req, res) {
  res.render('dashboard/project.jade', { csrfToken: req.csrfToken() });
});
//new project handler
router.post('/dashboard/project', utils.requireLogin, function(req, res) {console.log(req.session.user.username);
  var project = new models.Project({
    title:  req.body.title,
    name:   req.body.name,
    team:   req.body.team,
    author:	req.session.user.username,
    text:	req.body.text
  });
  project.save(function(err) {
    if (err) {
      var error = err;//'Something bad happened! Please try again.';
      if (err.code === 11000) {
        error = 'That project name is already taken, please try another.';
		res.send(error);
      }
		res.send(error);
    } else {
      res.redirect('/project/'+project.name);
    }
  });
});
//project view
router.get('/project/:name', function(req, res) {
  models.Project.findOne({name: req.params.name}, '_id title author team text', function(err, project) {
    if (!project) {
      res.render('user/project.jade', { error: "there is no project name with that name.", solution: error404});
    } else {
		var createdAt = project._id.getTimestamp();
		res.render('user/project.jade', { project: project, createdAt: createdAt });
    }
  });
});
module.exports = router;
