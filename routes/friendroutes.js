

var routes = function(Friend){
    // function that gets all friends for a given user. 
    // returns a list of usernames of friends
    var getAllFriends = function (req, res) {
        var username = req.body.username;
    }
    // function that gets all online friends for a given user. 
    // returns a list of usernames of friends
    var getAllOnlineFriends = function (req,res) {
        var username = req.body.username;
    }

    return {
        get_all_friends: getAllFriends,
        get_all_online_friends, getAllOnlineFriends
    }
}

module.exports = routes;