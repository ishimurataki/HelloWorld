var routes = function(User, Friend, visualizerView) {


	var getVisualizer = function(req, res) {
	    console.log("CALLED");
	    res.render(visualizerView);
	};

	var initVisualization = function(req, res) {

	    var username = 'matt';
	    var jsonString = '{' + '"id": ' + '"' + username + '"' + ", " + '"name": ' + '"' ;

	    User.get(username, function(err, info) {
	        if (err) {
	            console.log(err);
	            res.send(null);
	        } else {
	            console.log(info);
	            jsonString = jsonString + info.attrs.firstname + '"' + ', ' + '"children": [';
	            Friend.query(username).exec(function(err, response) {
	                if (err) {
	                    console.log(err);
	                    res.send(null);
	                } else {
	                    console.log(response.Items.length);
	                    if (response.Items.length == 0) {
	                       jsonString = jsonString + ']}';
	                       res.send(jsonString);
	                    } else {
	                        var cnt = 0;
	                        var list = [];
	                        for (var i = 0; i < response.Items.length; i++) {
	                            var id = response.Items[i].attrs.friendUsername;
	                            (function(username, jsonString, id) {
	                                User.get(id, function(err, data) {
	                                    console.log(id);
	                                    var name = data.attrs.firstname;
	                                    if (id == username) {
	                                        ;
	                                    } else {
	                                        list.push('{"id": ' + '"' + id + '"' + ", " + '"name": ' + '"' + name + '"' + ", " + '"data": ' + '{}, ' + '"children": []}, ');
	                                    }

	                                    cnt = cnt + 1;
	                                    if (cnt === (response.Items.length)) {
	                                        console.log(list);
	                                        for (var j = 0; j < list.length; j++) {
	                                            jsonString = jsonString + list[j];
	                                        }
	                                        jsonString = jsonString.slice(0, -2);
	                                        jsonString = jsonString + '], "data": ' + '[]}';
	                                        console.log(jsonString);
	                                        res.send(jsonString);
	                                    }
	                                })   
	                            })(username, jsonString, id);                            
	                        }
	                    }
	                    
	                }
	            });
	        }

    	});
    }


    var getNewVisualization = function(req, res) {
	    console.log(req.params.user);

	    var username = req.params.user;

	    var jsonString = '{' + '"id": ' + '"' + username + '"' + ", " + '"name": ' + '"' ;
	    User.get(username, function(err, info) {
	        if (err) {
	            console.log(err);
	            res.send(null);
	        } else {
	            jsonString = jsonString + info.attrs.firstname + '"' + ', ' + '"children": [';
	            Friend.query(username).exec(function(err, response) {
	                if (err) {
	                    console.log(err);
	                    res.send(null);
	                } else {
	                    console.log(response.Items.length);
	                    if (response.Items.length == 0) {
	                       jsonString = jsonString + ']}';
	                       res.send(jsonString);
	                    } else {
	                        var cnt = 0;
	                        var list = [];
	                        for (var i = 0; i < response.Items.length; i++) {
	                            var id = response.Items[i].attrs.friendUsername;
	                            (function(username, jsonString, id) {
	                                User.get(id, function(err, data) {
	                                    console.log(id);
	                                    var name = data.attrs.firstname;
	                                    if (id == username) {
	                                        ;
	                                    } else {
	                                        list.push('{"id": ' + '"' + id + '"' + ", " + '"name": ' + '"' + name + '"' + ", " + '"data": ' + '{}, ' + '"children": []}, ');
	                                    }

	                                    cnt = cnt + 1;
	                                    if (cnt === (response.Items.length)) {
	                                        console.log(list);
	                                        for (var j = 0; j < list.length; j++) {
	                                            jsonString = jsonString + list[j];
	                                        }
	                                        jsonString = jsonString.slice(0, -2);
	                                        jsonString = jsonString + '], "data": ' + '[]}';
	                                        console.log(jsonString);
	                                        res.send(jsonString);
	                                    }
	                                })   
	                            })(username, jsonString, id);                            
	                        }
	                    }
	                    
	                }
	            });
	        }
    	});
    }






	return {
		get_visualizer: getVisualizer,
		init_visualization: initVisualization,
		get_new_visualization: getNewVisualization

	}
}

module.exports = routes;