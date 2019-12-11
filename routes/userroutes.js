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

module.exports = router;