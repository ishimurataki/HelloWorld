var express = require('express');
var session = require('express-session');

// define/require all schemas here
var schemas = require('./createTableSchemas');
var User = schemas.User;
var Friend = schemas.Friend;
var Post = schemas.Post;


// define/require all helper dbs here
var friendsDb = require('./db/friendsdb')(Friend);

//define require all routes here
var authRoutes = require('./routes/authroutes.js')(User);
var friendRoutes = require('./routes/friendroutes.js')(friendsDb);
var postRoutes = require('./routes/postroutes.js')(Post, friendsDb);

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
   app.post('/api/getAllFriends', friendRoutes.get_all_friends);
   app.post('/api/getAllOnlineFriends', friendRoutes.get_all_online_friends);
   app.post('/api/getAllPosts', postRoutes.get_post);
   //app.post('/api/getAllComments', commentRoutes.get_all_comments);

// run the server below
console.log('Author: Kevin Xu (xukevin)');
app.listen(8080);
console.log('Server running on port. Now open http://localhost:8080/ in your browser!');