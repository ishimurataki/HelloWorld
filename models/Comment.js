const dynamo = require('dynamodb');
const {string} = require('joi');

module.exports = dynamo.define('Facebook Comments', {
	hashKey: 'postID',
	rangeKey: 'postDate',
	schema: {
		postID: string(),
		postDate: string(),
		creator: string(),
		date: string(),
		content: string()
	},
	tableName: "facebookComments"
});