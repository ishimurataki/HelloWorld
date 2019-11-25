const Joi = require('joi');

module.exports = dynamo => {
    return dynamo.define('Facebook Users', {
      hashKey  : 'username',
      schema : {
        username  : Joi.string(),
        email : Joi.string(),
        password  : Joi.string()
      },
      tableName: "facebookUsers"
    });
}
