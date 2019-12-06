const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Friend Requests', {
      hashKey  : 'receiver',
      rangeKey :  'date',
      schema : {
        receiver  : Joi.string(),
        date : Joi.string(),
        sender: Joi.String()
      },
      tableName: "facebookFriendRequests"
    });
}