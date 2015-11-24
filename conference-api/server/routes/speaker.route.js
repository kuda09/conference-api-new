var express = require("express");
var app = express();
var router = express.Router();


var Speaker = require("../models/speaker");


/* GET all users. */
router.get('/', function (request, response) {

    Speaker.find(function (error, speakers) {

        if (error)response.send(error);

        response.json(speakers);
    });
});


/*Get specific users by id*/


router.get("/:speaker_id", function (request, response) {


    Speaker.findById(request.params.speaker_id, function (error, speaker) {


        if(error){

            response.send(error);
            response.json(speaker);
        }

    })
})


/* PUT users*/

router.post("/", function (request, response) {

    //create a new instance of the Speaker Model
    var speaker = new Speaker();


    //sort the speakers properties (comes from the request)

    speaker.name = request.body.name;
    speaker.company = request.body.company;
    speaker.title = request.body.title;
    speaker.description = request.body.description;
    speaker.picture = request.body.picture;
    speaker.schedule = request.body.schedule;


    speaker.save(function (error) {

        if(error) response.send(error);

        //give some success message
        response.json({
            messsage: "speaker successfully updated"
        });

    })
})


/*
* Delete specific users by id
*
**/

router.delete("/:speaker_id", function (request, response) {


    Speaker.remove({

        _id: request.params.speaker_id
    }, function (error, speaker) {

        if(error) response.send(error);


        response.json({ message: "speaker successfully deleted"});

    })


})

module.exports = router;