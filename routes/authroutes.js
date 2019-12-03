

var routes = function(User){
    var checkLogin = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        User.get(username, function(err, acc) {
            if(err) {
                res.send("error: error getting user in checkLogin. More information" + err);
            } else {
                if(acc) {
                    console.log("successfully found user, now checking password")
                    var storedPassword = acc.get('password');
                    console.log(storedPassword);
                    console.log(password);
                    if(storedPassword === password) {
                        console.log("successful login. rerouting to feed");
                        res.send("success");
                    } else {
                        res.send("error: password mismatch");
                    }
                } else {
                      res.send("error: user not found")
                }
            }
        })
    }

    var addNewUser = function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var active = req.body.active;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var affiliation = req.body.affiliation;
        var interests = req.body.interests;
        var birthday = req.body.birthday;
        var status = req.body.status;
        User.get(username, function(err, acc) {
            if(err) {
                res.send("error: error checking existing user in signup. More information" + err);
            } else {
                if(acc) {
                    res.send("error: username already exists. Try again")
                } else {
                    var user = {
                        username: username,
                        password: password,
                        email: email,
                        active: active,
                        firstname: firstname,
                        lastname: lastname,
                        affiliation: affiliation,
                        interests: interests,
                        birthday: birthday,
                        status: status
                    };
                    User.create([user], function (err2, acc2) {
                        if(err2) {
                            res.send("error: error creating new user" + err2);
                        } else {
                            res.send("success");
                        }
                    });
                }
            }
        })

    }

    return {
        check_login: checkLogin,
        add_user: addNewUser
    }
}

module.exports = routes;