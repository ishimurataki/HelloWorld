var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath('./models/credentials.json');
var User = require('./models/User')(dynamo);
// dynamo.createTables(function(err) {
//     if (err) {
//       console.log('Error creating tables:', err);
//     } else {
//       console.log('Tables have been created, adding test data');
//     }
// });


module.exports = User;