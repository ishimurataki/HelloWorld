const dynamo = require('dynamodb');
const { string, array } = require('joi');

module.exports = dynamo.define('Facebook Users', {
      hashKey  : 'username',
      schema : {
        username  : string(),
        email : string(),
        password  : string(),
        active: string(),
        firstname: string(),
        lastname: string(),
        affiliation: string(),
        interests: array().items(string()),
        birthday: string(),
        status: string()
      },
      tableName: "facebookUsers"
    });
