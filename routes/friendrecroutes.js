var routes = function(file) {

	var fs = require("fs");

	// return top 5 friend recommendations
	var getTopFriendRecommendations = function (req, res) {
		var username = req.body.username;
		var text = fs.readFileSync(file);
		var textByLine = text.toString().split("\n");
		var friendsAndWeights = [];

		for (var i = 0; i < textByLine.length; i++) {
			var user = textByLine[i].split("\t")[0];
			if (user == username) {
				friendsAndWeights = textByLine[i].split("\t")[1].split(";");
				break;
			}
		}

		var friendRecs = [];
		var length = Math.min(friendsAndWeights.length, 5);
		for (var j = 1; j < length; j++) {
			var friend = friendsAndWeights[j].toString().split(",")[0];
	 		friendRecs.push(friend);
		}

		res.send(friendRecs);


	}


	return {
		get_top_friend_recs: getTopFriendRecommendations

	}
}

module.exports = routes;