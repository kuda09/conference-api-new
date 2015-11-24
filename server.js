//Import the modules installed to our server
var express = require("express");
var bodyParser = require("body-parser");
var Speaker = require("./server/models/speaker");


//Defining the routes for our API


//Start the Router
var router = express.Router();


//A simple middleware to use for all Routes and Request
router.use(function (request, response, next) {

//Give some messge on the console
    console.log("An action was performed by the server");

    next();
});


// Default message when access the API folder through the browser
router.get("/", function (request, response) {


    response.json({message: "Hello SPA, the API is working"});

})

router.route("/speakers")
    .post(function (request, response) {

        var speaker = new Speaker()

        //set the speakeaers properties (comes from the request);

        speaker.name = request.body.name;
        speaker.company = request.body.company;
        speaker.title = request.body.title;
        speaker.description = request.body.description;
        speaker.picture = request.body.picture;
        speaker.schedule = request.body.schedule;


        //save the data received
        speaker.save(function (error) {

            if (error) response.send(error);

            // give some success message
            response.json({message: "speaker successfully created"});

        });
    })
    .get(function (request, response) {

        Speaker.find(function (error, speakers) {

            if (error) response.send(error);


            response.json(speakers);

        });

    });


router.route("/speakers/:speaker_id")
    .get(function (request, response) {

        //get the speaker by id
        Speaker.findById(request.params.speaker_id, function (error, speaker) {

            if(error) response.send(error);


            response.json(speaker);

        })

    })
    .put(function (request, response) {

        Speaker.findById(request.params.speaker_id, function (error, speaker) {

            if(error) response.send(error);


            // set the speakers properties (comes from the request)
            speaker.name = req.body.name;
            speaker.company = req.body.company;
            speaker.title = req.body.title;
            speaker.description = req.body.description;
            speaker.picture = req.body.picture;
            speaker.schedule = req.body.schedule;

            speaker.save(function (error) {

                if(error) error.send(error);


                //give some success message

                response.json({message: "speaker successfully updated"});

            })

        })

    })
    .delete(function (request, response) {

        Speaker.remove({
            _id: request.params.speaker_id
        }, function(error, speaker) {

            if (error)error.send(error);

            // give some success message
            response.json({ message: 'speaker successfully deleted!' });
        });

    })


//Start the Express web framework
var app = express();

app.use("/api", router);


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





