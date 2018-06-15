var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");


var PORT = 3000;

// Require all models
var db = require("./models");

var app = express();

// configure middleware

// Morgan Logger for logging requests
app.use(logger("dev"));
// using body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended:true }));
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScraper");

// when server starts - creates and save a new user document

// routes
app.get("/scrape", function(req, res) {
	axios.get("https://www.bbc.com/news").then(function(response) {
		var $ = cheerio.load(response.data);

		$("h3").each(function(i, element) {

			var title = $(element).text();
			console.log(title)
		})
	})
})

app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
})
