const express = require('express');
const Friend = require('../models/Friend')
const friendsDb = require('../db/friendsdb')(Friend);

const router = express.Router();

router.post('/api/getAllFriends', (req, res) => {
    const username = req.body.username;
    friendsDb.getAllFriends(username, function (response) {
        res.send(response);
    })
});

router.post('/api/getAllOnlineFriends', (req, res) => {
    const username = req.body.username;
    friendsDb.getAllOnlineFriends(username, function (response) {
        res.send(response);
    })
})

router.post('/api/addFriendship', (req, res) => {
    const { username, friendUsername } = req.body;
    friendsDb.addFriendship(username, friendUsername, function (response) {
        console.log(response);
        res.send(response);
    })
})

module.exports = router;