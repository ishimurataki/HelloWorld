const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Posts', {
      hashKey  : 'creator',
      schema : {
        creator  : Joi.string(),
        caption : Joi.string()
      },
      tableName: "facebookPosts"
    });
}