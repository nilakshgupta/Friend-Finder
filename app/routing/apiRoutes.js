var path = require("path");
var friends = require("../data/friends");


    // Export API routes
    module.exports = function(app) {
        app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // Add new friend entry
    app.post('/api/friends', function(req, res) {
        // Capture the user input object
        var differenceArray = [];
        var currentUserScores = req.body.scores;

        for(var i=0; i < friends.length; i++){
            var friendsScores = friends[i].scores;      
            var sum = 0;
            for(var j=0; j < 10; j++){                              
            sum += Math.abs(parseInt(currentUserScores[j]) - friendsScores[j]);                         
            }
            differenceArray.push({"index" : i, "sum" : sum});
        }
        
        differenceArray.sort(function(a,b){
            return a.sum - b.sum;
        });

        var indexMatched = differenceArray[0].index;
        
        friends.push(req.body);
        
        res.json(friends[indexMatched]);        
    });
}