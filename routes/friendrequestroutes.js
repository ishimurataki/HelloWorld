var routes = function(friendreqDb) {

	var getAllFriendReqs = function (req, res) {
		var username = req.body.username;
		friendreqDb.getAllFriendReqs(username, function(response) {
			res.send(response);
		})
	}

	var sendFriendRequest = function (req, res) {
		var username = req.body.username;
		var date = req.body.date;
		var sender = req.body.sender;
		friendreqDb.sendFriendRequest(username, date, sender, function(response) {
			res.send(response);
		})
	}

	var acceptFriendRequest = function (req, res) {
		var username = req.body.username;
		var date = req.body.date;
		var sender = req.body.sender;
		friendreqDb.acceptFriendRequest(username, date, sender, function(response) {
			res.send(response);
		})
	}

	var rejectFriendRequest = function(req, res) {
		var username = req.body.username;
		var date = req.body.date;
		var sender = req.body.sender;
		friendreqDb.rejectFriendRequest(username, date, sender, function(response) {
			res.send(response);
		})
	}

	return {
		get_all_friend_reqs : getAllFriendReqs,
		send_friend_request : sendFriendRequest,
		accept_friend_request : acceptFriendRequest,
		reject_friend_request : rejectFriendRequest

	}
}

module.exports = routes;