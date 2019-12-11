const express = require('express');
const User = require('../models/User')
const usersDb = require('../db/usersdb')(User);

const router = express.Router();

router.post('/api/getAllUserInfo', (req, res) => {
	const username = req.body.username;
	usersDb.getAllUserInfo(username, (response) => {
		res.send(response);
	})
});

router.post('/api/updateStatus', (req, res) => {
	const username = req.body.username;
	const status = req.body.status;
	usersDb.updateStatus(username, status, (response) => {
		res.send(response);
	})
})

router.post('/api/getStatus', (req, res) => {
	const username = req.body.username;
	usersDb.getStatus(username, (response) => {
		res.send(response);
	})
})

router.post('/api/updateProfileAttribute', (req, res) => {
	const { username, field, value } = req.body;
	usersDb.updateProfileAttribute(username, field, value, (response) => {
		res.send(response);
	})
})


var routes = function (usersDb) {

	// function to get all user info
	var getAllUserInfo = function (req, res) {
		var username = req.body.username;
		usersDb.getAllUserInfo(username, function (response) {
			res.send(response);
		})
	}

	// function to update status of user
	var updateStatus = function (req, res) {
		var username = req.body.username;
		var status = req.body.status;
		usersDb.updateStatus(username, status, function (response) {
			res.send(response);
		})
	}

	// function to get status of a user
	var getStatus = function (req, res) {
		var username = req.body.username;
		usersDb.getStatus(username, function (response) {
			res.send(response);
		})
	}

	var updateProfileAttribute = function (req, res) {
		var username = req.body.username;
		var field = req.body.field;
		var value = req.body.value;
		usersDb.updateProfileAttribute(username, field, value, function (response) {
			res.send(response);
		})
	}

	return {
		get_all_user_info: getAllUserInfo,
		update_status: updateStatus,
		get_status: getStatus,
		update_profile_attribute: updateProfileAttribute
	}
}

module.exports = router;