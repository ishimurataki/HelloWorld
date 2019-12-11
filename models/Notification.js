const dynamo = require('dynamodb');
const {string} = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Notifications', {
      hashKey  : 'username',
      rangeKey : 'date',
      schema : {
        username  : string(),
        date: string(),
        notification: string()
      },
      tableName: "facebookNotifications"
    });
}
