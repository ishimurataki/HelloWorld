var routes = function(Friend){
    // function that gets all friends for a given user. 
    // returns a list of usernames of friends
    var getAllFriends = function (username, callback) {
        console.log('Getting all friends for ' + username);
        Friend.query(username).exec(function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                var friendUsernames = [];
                console.log(response);
                for (var i = 0; i < response.Items.length; i++) {
                    console.log(response.Items[i].attrs);
                    friendUsernames.push(response.Items[i].attrs.friendUsername);
                }
                console.log(friendUsernames);
                callback(friendUsernames);
            }
            
        });
        
        
    }
    // function that gets all online friends for a given user. 
    // returns a list of usernames of friends
    var getAllOnlineFriends = function (username, callback) {
        console.log('Getting all online friends for ' + username);
        Friend.query(username).filter('active').equals('true').exec(function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                var activeFriendUsernames = [];
                for (var i = 0; i < response.Items.length; i++) {
                    activeFriendUsernames.push(response.Items[i].attrs.friendUsername);
                }
                callback(activeFriendUsernames);
            }
            
        });
    }

    return {
        getAllFriends: getAllFriends,
        getAllOnlineFriends: getAllOnlineFriends
    }
}

module.exports = routes;