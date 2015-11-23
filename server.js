//Import the modules installed to our server
var express = require("express");
var bodyParser = require("body-parser");



//Start the Express web framework
var app = express();


//configure app
app.use(bodyParser());

//where the application will run
var port = process.env.PORT || 8080;

//Import Mongoose
var mongoose = require("mongoose");

//conncect to our database
mongoose.connect("mongodb://localhost/node-api");


//start the node server
app.listen(port);

console.log("Magic happens on port " + port);





