const express = require('express');
const Post = require('../models/Post')
const Friend = require('../models/Friend')
const postsDb = require('../db/postsdb')(Friend, Post);

const router = express.Router();

router.post('/api/getAllPosts', (req, res) => {
	const username = req.body.username;
	postsDb.getAllPosts(username, function (response) {
		console.log(response);
		res.send(response);
	})
})


router.post('/api/addNewPost', (req, res) => {
	const { creator, data, recipient, content } = req.body;

	postsDb.addNewPost(creator, date, recipient, content, (response) => {
		console.log('Added new post for ' + creator + ' at ' + date);
		res.send(response);
	})
})

var routes = function (Post, postsDb) {

	// function that gets all posts that should be seen by a
	// certain user (posts made by friends)
	var getAllPosts = function (req, res) {
		var username = req.body.username;
		postsDb.getAllPosts(username, function (response) {
			console.log(response);
			res.send(response);
		})

	}

	// function to add new post
	var addNewPost = function (req, res) {
		var creator = req.body.creator;
		var date = req.body.date;
		var recipient = req.body.recipient;
		var content = req.body.content;
		postsDb.addNewPost(creator, date, recipient, content, function (response) {
			console.log('Added new post for ' + creator + ' at ' + date);
			res.send(response);
		})
	}

	return {
		get_post: getAllPosts,
		add_new_post: addNewPost
	}
}

module.exports = router;