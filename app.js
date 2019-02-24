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
        url: "https://us20.api.mailchimp.com/3.0/lists/616ed90654",
        method: "POST",
        headers: {
            "Authorization": "jchacon 09c43c1e69c10617ce258d0e53d7bfb0-us20 "
        },
        body: jsonData
    };


    request(options, function (error, response, body) {

        if (error) {
            res.sendFile(__dirname + "/failure.html");

        } else {

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

app.listen(3000, function () {
    console.log("Server is running on  port 3000");
})

//KEY USER
//09c43c1e69c10617ce258d0e53d7bfb0-us20
//KEY LISTA
//616ed90654