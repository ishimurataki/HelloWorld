var express = require('express');
var session = require('express-session');
var routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(session({
	key: 'user_sid',
	secret: 'awegjoiag',
	resave: false,
	saveUninitialized: false
}))

/* Below we install the routes. The first argument is the URL that we
   are routing, and the second argument is the handler function that
   should be invoked when someone opens that URL. Note the difference
   between app.get and app.post; normal web requests are GETs, but
   POST is often used when submitting web forms ('method="post"'). */
   app.post('/api/checklogin', routes.check_login);
   app.post('/api/signup', routes.add_user);
/* Run the server */
console.log('Author: Kevin Xu (xukevin)');
app.listen(8080);
console.log('Server running on port. Now open http://localhost:8080/ in your browser!');