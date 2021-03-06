var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");


var PORT = process.env.PORT || 8080;

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

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articleScraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// routes

// get the scraping results
app.get("/scrape", function(req, res) {
	axios.get("http://www.startribune.com/").then(function(response) {
		var $ = cheerio.load(response.data);
		$("div.tease").each(function(i, element) {
			
			var result = {};

			result.title = $(this)
			.children("h3")
			.text();

			result.link = $(this)
			.children()
			.children()
			.attr("href");

			result.summary = $(this)
			.children("div.tease-summary")
			.text();
			result.whenPublished = $(this)
			.children("div.tease-timestamp.js-timestamp ")
			.text()

			console.log(result.link)

			db.Article.create(result)
			.then(function(dbArticle) {
				console.log(dbArticle)
			})
			.catch(function(err) {
				return res.json(err);
			})
		});
		res.send("scrape complete")
	});
});

// route to grab aritcles from database
app.get("/articles", function(req, res) {
	db.Article.find({}).sort({ _id: -1})
	.then(function(dbArticle) {
		res.json(dbArticle);
	})
	.catch(function(err) {
		res.json(err)
	});
});

// route to grab aritcle and populte it with its note

app.get("/articles/:id", function(req, res) {
	db.Article.findOne({ _id: req.params.id })
	.populate("note")
	.then(function(dbArticle) {
		res.json(dbArticle);
	})
	.catch(function(err) {
		res.json(err);
	})
});


app.post("/articles/:id", function(req, res) {
	db.Note.create(req.body)
	.then(function(dbNote) {
		return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
	})
	.then(function(dbArticle) {
		res.json(dbArticle);
	})
	.catch(function(err) {
		res.json(err)
	});
});





app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
})
