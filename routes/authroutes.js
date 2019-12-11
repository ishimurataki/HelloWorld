const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/api/checklogin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.get(username);
        if (user) {
            console.log("successfully found user, now checking password")
            const storedPassword = user.get('password');
            if (storedPassword === password) {
                console.log("successful login. rerouting to feed");
                res.send("success");
            } else {
                res.status(401).send("error: password mismatch");
            }
        } else res.status(401).send("error: user not found")
    } catch (e) {
        res.status(500).send("error: error getting user in checkLogin. More information" + e)
    }
})

router.post('/api/signup', async (req, res) => {
    console.log(req.body);
    const {username, email, password, active, firstname, lastname, affiliation, interests, birthday, status} = req.body;

    const user = await User.get(username)
    try {
        if (user) return res.status(401).send('error: username already exists. Try again');
        const newUser = {username, password, email, active, firstname, lastname, affiliation, interests, birthday, status};
        User.create([newUser], (err2, acc2) => {
            if (err2) {
                res.send("error: error creating new user" + err2);
            } else {
                res.send("success");
            }
        });
    } catch (e) {   
        res.status(500).send("error: error checking existing user in signup. More information" + err);
    }
});

module.exports = router;