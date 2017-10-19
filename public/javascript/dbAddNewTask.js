const sqlite3 = require('sqlite3').verbose();
var fs = require("fs");

exports.addNewTask = function(taskObj) {
    var message = true;
    // connect to the database
    let db = new sqlite3.Database('toDo.db');

    // insert the data in the table
    db.run('insert into myTasks(task, status) values(?,?)', [taskObj.task, false], function(err) {

        if (err) {
            console.error(err.message);
            message = false;
        }

        db.serialize(function() {
            db.all("select * from myTasks", function(err, allRows) {
                if (err != null) {
                    console.log(err);
                    callback(err);
                }

                fs.writeFileSync("./temp.json", JSON.stringify(allRows, null, 4));

                db.close();
                return allRows;
            });
        });
    });
};