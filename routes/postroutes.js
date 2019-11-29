var routes = function(Post) {

	// function that gets all posts that should be seen by a
	// certain user (posts made by friends)
	var getPosts = function (req, res) {
		var user = req.body.username;

	}


	return {
		get_post : getPosts
	}
}

module.exports = routes;