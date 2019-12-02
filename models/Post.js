const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Posts', {
      hashKey  : 'creator',
      rangeKey : 'date',
      schema : {
        creator  : Joi.string(),
        date : Joi.string(),
        recipient : Joi.string(),
        content : Joi.string()
      },
      tableName: "facebookPosts"
    });
}