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
                    if (response.Items.length != 0) {
                        boolean = 'true';
                    } else {
                        boolean = 'false';
                    }
                });
                if (boolean === 'true') {
                    postObj.push(post);
                }
                
            }
            callback(postObj);
        });
        
        
        
        
        
    }


    return {
        getAllPosts: getAllPosts
    }
}

module.exports = routes;