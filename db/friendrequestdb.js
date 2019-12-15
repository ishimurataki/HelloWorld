var routes = function(FriendRequests, User, Friend) {

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
								users.push(userInfo.attrs.username);
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

	var sendFriendRequest = function (username, sender, callback) {
		console.log('Sending a friend requestion from ' + sender + ' to ' + username);
		var friendReq = {
			username: username,
			sender: sender
		}

		FriendRequests.query(username).where('sender').equals(sender).exec(function(err, contains) {
			if (err) {
				console.log(err);
				callback(null);
			// changed the clause here because if something is not contained, contains will not be null
			// instead it will have an object of Items length 0;
			} else if (contains.Items.length == 0) {	
				FriendRequests.create([friendReq], function(err, response) {
					if (err) {
						console.log(err);
						callback(null);
					} else {
						console.log('Created friend request from ' + sender + ' to ' + username);
						callback(response);
					}
				})
			} else {
				console.log(contains);
				console.log('Friend request already sent from ' + sender + ' to ' + username);
				callback(contains);
			}
		})



	}

	var acceptFriendRequest = function(username, sender, callback) {
		console.log(username + " accepted " + sender + " friend request");
		FriendRequests.destroy({username: username, sender: sender}, function (err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Friend request is accepted');
				console.log('Creating new friendship in Friends database');
				var friendship1 = {
					username: username,
					friendUsername: sender
				}

				var friendship2 = {
					username: sender,
					friendUsername: username
				}

				Friend.create([friendship1, friendship2], function(err, friends) {
					if (err) {
						console.log(err);
						callback(null);
					} else {
						console.log('Added new friendship');
						callback("success");
					}
				})
			}
		})

	}

	var rejectFriendRequest = function(username, sender, callback) {
		console.log(username + " rejected " + sender + " friend request");
		FriendRequests.destroy({username: username, sender: sender}, function (err, response) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Friend request is rejected');
				callback(response);
			}
		})
	}


	return {
		getAllFriendReqs : getAllFriendReqs,
		sendFriendRequest: sendFriendRequest,
		acceptFriendRequest: acceptFriendRequest,
		rejectFriendRequest: rejectFriendRequest
	}
}

module.exports = routes;