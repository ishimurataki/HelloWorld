var routes = function(Friend){
    // function that gets all friends for a given user. 
    // returns a list of usernames of friends
    var getAllFriends = function (username, callback) {
        console.log('Getting all friends for ' + username);
        Friend.query(username).exec(function(response) {
            var friendUsernames = [];
            for (var i = 0; i < response.Items.length; i++) {
                friendUsernames.push(response.Items[i].friendUsername);
            }
            callback(friendUsernames);
        });
    }
    // function that gets all online friends for a given user. 
    // returns a list of usernames of friends
    var getAllOnlineFriends = function (username, callback) {
        console.log('Getting all online friends for ' + username);
        Friend.query(username).where('active').invalid(false).exec(function(response) {
            var activeFriendUsernames = [];
            for (var i = 0; i < response.Items.length; i++) {
                activeFriendUsernames.push(response.Items[i].friendUsername);
            }
            callback(activeFriendUsernames);
        });
    }

    return {
        getAllFriends: getAllFriends,
        getAllOnlineFriends: getAllOnlineFriends
    }
}

module.exports = routes;