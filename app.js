const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const request = require('request');

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("index");
});



app.get("/results", function(req, res) {
    var searchTerm = req.query.searchTerm;
    var url = "http://omdbapi.com/?apikey=19bbe01c&s=" + searchTerm;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var movieData = JSON.parse(body);
            // console.log(movieData);
            res.render("results", {movieData: movieData, searchTerm: searchTerm});
        } else {
            console.log("SOMETHING WENT WRONG!!");
            console.log(error);
        }
    });
});

app.get("/details/:id", function(req, res) {
    console.log(req.params.id);
    var movieId = req.params.id;
    var url = "http://omdbapi.com/?apikey=19bbe01c&i=" + movieId;
    //http://omdbapi.com/?apikey=19bbe01c&i=tt1650062
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var movieData = JSON.parse(body);
            console.log(movieData);
            res.render("detail", {movieData: movieData});
        } else {
            console.log("SOMETHING WENT WRONG!!");
            console.log(error);
        }
    });
});


//apikey=19bbe01c
//http://omdbapi.com/?apikey=19bbe01c&s=star

app.listen(port, function() {
    console.log('SERVER STARTED AT PORT 3000');
});