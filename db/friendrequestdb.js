var routes = function(FriendRequests, User) {

	// function to return people who sent indicated user
	// a friend request - returns list of senders

	var getAllFriendReqs = function (username, callback) {
		console.log('Getting all users who sent ' + username + ' a friend request');
		FriendRequests.query(username).exec(function (err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				var users = [];
				for (var i = 0; i < response.Items.length; i++) {
					var sender = response.Items[i].attrs.sender;
					(function(sender) {
						// sending whole user object
						User.get(username, function(err, userInfo) {
							users.push(userInfo);
						});
					})(sender);
				}

				console.log("Got all users who sent " + username + " a friend request");
				callback(users);
			}
		})
	}


	return {
		getAllFriendReqs : getAllFriendReqs
	}
}

module.exports = routes;