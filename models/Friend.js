const dynamo = require('dynamodb');
const {string} = require('joi');

module.exports = dynamo.define('Facebook Friends', {
  hashKey: 'username',
  rangeKey: 'friendUsername',
  schema: {
    username: string(),
    friendUsername: string()
  },
  tableName: "facebookFriends"
});

