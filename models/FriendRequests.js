const dynamo = require('dynamodb');
const {string} = require('joi');

module.exports = dynamo.define('Facebook Friend Requests', {
  hashKey: 'username',
  rangeKey: 'date',
  schema: {
    username: string(),
    date: string(),
    sender: string()
  },
  tableName: "facebookFriendRequests"
});