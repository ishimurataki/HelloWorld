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

	return {
		get_all_friend_reqs : getAllFriendReqs,
		send_friend_request : sendFriendRequest
	}
}

module.exports = routes;