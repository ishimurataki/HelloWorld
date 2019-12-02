var routes = function(Post, postsDb) {

	// function that gets all posts that should be seen by a
	// certain user (posts made by friends)
	var getAllPosts = function (req, res) {
		var username = req.body.username;
		postsDb.getAllPosts(username, function(response) {
			res.send(response);
		})

	}

	return {
		get_post : getAllPosts
	}
}

module.exports = routes;