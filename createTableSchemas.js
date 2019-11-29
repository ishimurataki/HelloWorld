var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath('./models/credentials.json');

var User = require('./models/User')(dynamo);
var Friend = require('./models/Friend')(dynamo); 
var Post = require('./models/Post')(dynamo);

// create tables snippet of code is a one time thing, to build a table that does not exist.
// if a schema was updated and a table already exists, we will have to delete the table, and rebuild it
// we can delete the table manually off of the aws console or use *Insert schema*.deleteTable followed by 
// // createTable
// dynamo.createTables(function(err) {
//     if (err) {
//       console.log('Error creating tables:', err);
//     } else {
//       console.log('Tables have been created, adding test data');
//     }
// });


module.exports = {
    User: User,
    Friend: Friend,
    Post: Post
};