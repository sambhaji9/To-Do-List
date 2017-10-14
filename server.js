// load the express module
var express = require("express");
var app = express();

app.use(express.static("public"));

// load the sqlite connection module
var dbObject = require("./public/javascript/dbAddNewTask");

app.get("/index.html", function(request, response) {
    // send the index.html file
    response.sendFile(__dirname + "/index.html");
});

app.get("/add_task", function(request, response) {

    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': "*"
    });

    var taskObj = {
        task: request.query.task,
        status: "false"
    };

    var message = dbObject.addNewTask(taskObj);
    console.log("Row added successfully: " + message);
    response.end(message.toString());
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at %s:%s", host, port);
});