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
					var cnt = 0;
					var sender = response.Items[i].attrs.sender;
					(function(users, sender) {
						// sending whole user object
						User.get(sender, function(err, userInfo) {
							if (err) {
								
							} else {
								users.push(userInfo);
								console.log(users);
							}

							if (cnt === (response.Items.length - 1)) {
								console.log(users);
								callback(users);
							}
							cnt = cnt + 1;
						});
					})(users, sender);
				}

				console.log("Got all users who sent " + username + " a friend request");
			}
		})
	}

	// function to send friend request

	var sendFriendRequest = function (username, date, sender, callback) {
		console.log('Sending a friend requestion from ' + sender + ' to ' + username);
		var friendReq = {
			username: username,
			date: date, 
			sender: sender
		}
		FriendRequests.create([friendReq], function(err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Created friend request from ' + sender + ' to ' + username);
				callback(response);
			}
		})
	}


	return {
		getAllFriendReqs : getAllFriendReqs,
		sendFriendRequest: sendFriendRequest
	}
}

module.exports = routes;