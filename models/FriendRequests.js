const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Friend Requests', {
      hashKey  : 'username',
      rangeKey :  'date',
      schema : {
        username  : Joi.string(),
        date : Joi.string(),
        sender: Joi.string()
      },
      tableName: "facebookFriendRequests"
    });
}