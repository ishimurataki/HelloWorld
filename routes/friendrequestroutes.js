var routes = function(friendreqDb) {

	var getAllFriendReqs = function (req, res) {
		var username = req.body.username;
		friendreqDb.getAllFriendReqs(username, function(response) {
			res.send(response);
		})
	}

	return {
		get_all_friend_reqs : getAllFriendReqs;
	}
}

module.exports = routes;