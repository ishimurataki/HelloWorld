

var routes = function(Post, Comment, friendsDb){
    // function that gets all relevant posts for a given user. Relevant posts include all posts posted by friends. 
    // returns a list of post objects, where the post object contains creator, date, caption, etc
    var getAllPosts = function (req, res) {
    }
    // function that gets all comments for a user
    // Returns a javascript object where the key is a postId, and the value is a list of comments associated with a post
    var getAllComments = function (req,res) {
    }

    return {
        get_all_posts: getAllPosts,
        get_all_comments: getAllComments
    }
}

module.exports = routes;