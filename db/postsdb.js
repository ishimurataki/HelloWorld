var routes = function(Friend, Post){

    // function that returns list of post objects 
    // for a specific user 
    var getPosts = function (username, callback) {
        console.log('Getting all posts for ' + username);
        Friend.query(username).exec(function(friends) {
            for (var i = 0; i < friends.Items.length; i++) {
                Post.scan().where('creator').equals(friends.Items[i].friendUsername).exec(function(posts) {
                    var postObj = [];
                    for (let j = 0; j < posts.Items.length; j++) {
                        postObj.push(posts.Items[j]);
                    }
                });
            }

            callback(postObj);

        });
    }


    return {
        getPosts: getPosts
    }
}

module.exports = routes;