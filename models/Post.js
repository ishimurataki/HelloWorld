const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Posts', {
      hashKey  : 'postID',
      schema : {
      	creator : Joi.string(),
      	content: Joi.string(),
      	recipient: Joi.string(),
      	timestamp: Joi.string()
      },
      tableName: "facebookPosts"
    });
}