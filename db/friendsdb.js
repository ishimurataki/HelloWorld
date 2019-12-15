var routes = function(Friend, User){
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
        // Friend.query(username).filter('active').equals('true').exec(function(err, response) {
        //     if (err) {
        //         console.log(err);
        //         callback(null);
        //     } else {
        //         var activeFriendUsernames = [];
        //         for (var i = 0; i < response.Items.length; i++) {
        //             activeFriendUsernames.push(response.Items[i].attrs.friendUsername);
        //         }
        //         callback(activeFriendUsernames);
        //     }
            
        // });
        Friend.query(username).exec(function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                var j = 0;
                var friendUsernames = [];
                var activeFriendUsernames = [];
                for (var i = 0; i < response.Items.length; i++) {
                    friendUsernames.push(response.Items[i].attrs.friendUsername);
                }
                console.log(friendUsernames);
                for(var i = 0; i < friendUsernames.length; i ++) {
                    var friend = friendUsernames[i];
                    (function(activeFriendUsernames) {
                        User.query(friend).filter('active').equals('true').exec(function(err, response) {
                        if(err) {
                            console.log(err);
                            callback(null);
                        } else {
                            console.log(response);
                            if(response.Items.length > 0) {
                                activeFriendUsernames.push(friend);
                            }
                        }
                        if(j == friendUsernames.length - 1) {
                            callback(activeFriendUsernames)
                        }
                        j = j + 1;
                    })
                    })(activeFriendUsernames);
                }
            }
            
        });
    }

    // function to add friend into database
    var addFriendship = function(username, friendUsername, callback) {
        console.log('Adding ' + username + 'and ' + friendUsername);
        var friendship1 = {username: username, friendUsername: friendUsername};
        var friendship2 = {username: friendUsername, friendUsername: username};
        Friend.create([friendship1, friendship2], function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                console.log('Created friendship between ' + username + 'and ' + friendUsername);
                callback(response);
            }
        })
    }

    return {
        getAllFriends: getAllFriends,
        getAllOnlineFriends: getAllOnlineFriends,
        addFriendship: addFriendship
    }
}

module.exports = routes;