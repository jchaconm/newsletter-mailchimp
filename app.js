const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const favicon = require('serve-favicon');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");

})

app.post("/", function (req, res) {


    var firstName = req.body.firstName;

    var lastName = req.body.lastName;

    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]

    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/"+ process.env.listId,
        method: "POST",
        headers: {
            "Authorization": "jchacon "+ process.env.apiKey
        },
        body: jsonData
    };


    request(options, function (error, response, body) {

        if (error) {
            res.sendFile(__dirname + "/failure.html");

            console.log(error);

        } else {

            console.log(response.statusCode);

            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");

            }
        }


    })


})



app.post("/failure", function(req,res){

    res.redirect("/");

})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on  port 3000");
})