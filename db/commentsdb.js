var routes = function(Comment) {

	// function to get all comments for a post
	var getAllComments = function (postCreator, postID, callback) {
		console.log('Getting all comments for the post made by ' + postCreator +
			'at ' + date);
		Comment.query(postCreator).filter('postID').equals(postID).exec(function(err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log(response);
				var postComments = [];
				for (var i = 0; i < response.Items.length; i++) {
					var comment = response.Items[i];
					postComments.push(comment);
				}
				callback(postComments);

			}
		})
	}

	// function to add new comment for a post
	var addNewComment = function(postID, postDate, creator, date, content, callback) {
		console.log('Adding new comment by ' + creator + ' at ' + date);
		var comment = {
			postID: postID,
			postDate: postDate,
			creator: creator,
			date: date,
			content: content
		}
		Comment.create([comment], function(err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Added new comment by ' + creator + ' at ' + date);
			}
		})
	}

	return {
		getAllComments: getAllComments,
		addNewComment: addNewComment
	}
}

module.exports = routes;