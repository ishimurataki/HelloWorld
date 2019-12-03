var express = require('express');
var session = require('express-session');

// define/require all schemas here
var schemas = require('./createTableSchemas');
var User = schemas.User;
var Friend = schemas.Friend;
var Post = schemas.Post;
var Comment = schemas.Comment;

// define/require all helper dbs here
var friendsDb = require('./db/friendsdb')(Friend);
var postsDb = require('./db/postsdb')(Friend, Post);
var usersDb = require('./db/usersdb')(User);
var commentsDb = require('./db/commentsdb')(Comment);

//define require all routes here
var authRoutes = require('./routes/authroutes.js')(User);
var friendRoutes = require('./routes/friendroutes.js')(friendsDb);
var postRoutes = require('./routes/postroutes.js')(Post, postsDb);
var userRoutes = require('./routes/userroutes.js')(usersDb);
var commentRoutes = require('./routes/commentroutes.js')(commentsDb);

const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	key: 'user_sid',
	secret: 'awegjoiag',
	resave: false,
	saveUninitialized: false
}))

// install the routes here
   app.post('/api/checklogin', authRoutes.check_login);
   app.post('/api/signup', authRoutes.add_user);
   app.post('/api/getAllUserInfo', userRoutes.get_all_user_info);
   app.post('/api/updateStatus', userRoutes.update_status);
   app.post('/api/getStatus', userRoutes.get_status);
   app.post('/api/getAllFriends', friendRoutes.get_all_friends);
   app.post('/api/getAllOnlineFriends', friendRoutes.get_all_online_friends);
   app.post('/api/addFriendship', friendRoutes.add_friendship);
   app.post('/api/getAllPosts', postRoutes.get_post);
   app.post('/api/addNewPost', postRoutes.add_new_post);
   app.post('/api/getAllComments', commentRoutes.get_all_comments);
   app.post('/api/addNewComment', commentRoutes.add_new_comment);

// run the server below
console.log('Author: Kevin Xu (xukevin)');
app.listen(8080);
console.log('Server running on port. Now open http://localhost:8080/ in your browser!');