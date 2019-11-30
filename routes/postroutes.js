var routes = function(postsdb) {

	// function that gets all posts that should be seen by a
	// certain user (posts made by friends)
	var getPosts = function (req, res) {
		var username = req.body.username;
		postsdb.getPosts(username, function(response) {
			res.send(response);
		})


	}

	return {
		get_post : getPosts
	}
}

module.exports = routes;