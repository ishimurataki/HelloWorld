const express = require('express');
const Comment = require('../models/Comment')
const commentsDb = require('../db/commentsdb')(Comment);

const router = express.Router();

router.post('/api/getAllComments', (req, res) => {
	const {postID, date} = req.body; 
		commentsDb.getAllComments(postID, date, function(response) {
			res.send(response);
		})
})

router.post('/api/addNewComment', (req, res) => {
	const {postID, postDate, creator, date, content} = req.body; 
	commentsDb.addNewComment(postID, postDate, creator, date, content, function(response) {
		console.log('Added new comment by ' + creator + ' at ' + date);
		res.send(response);
	})
})

module.exports = router;