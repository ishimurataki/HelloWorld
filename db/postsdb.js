var routes = function(Friend, Post){

    // function that returns list of post objects 
    // for a specific user 
    var getAllPosts = function (username, callback) {
        console.log('Getting all posts for ' + username);
        Post.scan().exec(function(err, posts) {
            var postObj = [];
            for (var i = 0; i < posts.Items.length; i++) {
                console.log(i);
                var post = posts.Items[i];
                var friend = posts.Items[i].attrs.creator;
                var boolean = 'true';
                Friend.query(username).where('friendUsername').equals(friend).exec(function(err, response) {
                    if(response) {
                        if (response.Items.length != 0) {
                            boolean = 'true';
                        } else {
                            boolean = 'false';
                        }
                    }
                });
                if (boolean === 'true') {
                    postObj.push(post);
                }
                
            }
            callback(postObj);
        }); 
    }

    // function to make a post
    var addNewPost = function (creator, date, recipient, content, callback) {
        console.log('Adding new post for ' + creator + " at " + date);
        var post = {
            creator: creator,
            date: date, 
            recipient: recipient,
            content: content
        }
        Post.create([post], function(err, response) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                console.log('Added new post for ' + creator + ' at ' + date);
                callback(post);
            }
        })
    }


    return {
        getAllPosts: getAllPosts,
        addNewPost: addNewPost
    }
}

module.exports = routes;