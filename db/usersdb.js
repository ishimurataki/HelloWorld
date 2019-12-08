var routes = function(User) {

	// function to get all info for a user
	var getAllUserInfo = function(username, callback) {
		console.log('Getting info for ' + username);
		User.get(username, function(err, info) {
			if (err) {
				console.log(err);
				callback(null);
			} else if (info == null) {
				console.log('User does not exist');
			} else {
				//console.log(info);
				callback(info);
			}
		})
	}

	// function to update status of a user
	var updateStatus = function(username, status, callback) {
		console.log('Updating status for ' + username);
		User.update({username: username, status: status}, function(err, update) {
			if (err) {
				console.log(err);
				callback(null);
			} else {
				console.log('Updated status of ' + username);
				callback(update);
			}
		})
	}

	var getStatus = function(username, callback) {
		console.log('Getting status for ' + username);
		User.get(username, function(err, data) {
			if (err) {
				console.log(err);
				callback(null);
			} else if (data == null) {
				console.log('User does not exist');
			} else {
				console.log(data);
				callback(data.attrs.status);
			}
		})
	}

	return {
		getAllUserInfo: getAllUserInfo,
		updateStatus: updateStatus,
		getStatus: getStatus
	}
}

module.exports = routes;