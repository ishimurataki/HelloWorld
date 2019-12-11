const dynamo = require('dynamodb');
const { string } = require('joi');

module.exports = dynamo.define('Facebook Posts', {
  hashKey: 'creator',
  rangeKey: 'postID',
  schema: {
    creator: string(),
    postID: dynamo.types.uuid(),
    date: string(),
    recipient: string(),
    content: string()
  },
  tableName: "facebookPosts"
});