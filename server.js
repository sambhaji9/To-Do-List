// load the express module
var express = require("express");
var app = express();
var fs = require("fs");

app.use(express.static("public"));
// load the sqlite connection module
var dbObject = require("./public/javascript/dbAddNewTask");
var dbSelect = require("./public/javascript/dbSelectTasks");
var dbUpdate = require("./public/javascript/dbUpdateTasks");

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
        status: false
    };

    var message = dbObject.addNewTask(taskObj);

    setTimeout(readFile, 2000);

    function readFile() {
        fs.readFile("./temp.json", "utf-8", function(err, data) {
            if (err) {
                console.error(err);
            } else {
                response.end(data);
            }
        });
    }
});

app.get("/select_tasks", function(request, response) {
    response.writeHead(200, {
        'Content-Type': "text/html",
        'Access-Control-Allow-Origin': "*"
    });

    fs.readFile("./temp.json", "utf-8", function(err, data) {
        if (err) {
            console.error(err);
        } else {
            response.end(data);
        }
    });
});

app.get("/update_task", function(request, response) {
    response.writeHead(200, {
        'Content-Type': "text/html",
        'Access-Control-Allow-Origin': "*"
    });

    var updateObj = {
        taskId: request.query.rowId,
        taskStatus: request.query.tickStatus
    };

    var message = dbUpdate.updateStatus(updateObj);
    response.end(message);
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at %s:%s", host, port);
});