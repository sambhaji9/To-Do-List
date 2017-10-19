const sqlite3 = require('sqlite3').verbose();
var fs = require("fs");

exports.updateStatus = function(updateObj) {
    var message = "Updated successfully";
    // connect to the database
    let db = new sqlite3.Database('toDo.db');

    var status = 0;
    if (updateObj.taskStatus === "true") {
        status = 1;
    }

    // specify the data
    let data = [status, new Date().toLocaleString(), updateObj.taskId];
    // make the sql statement
    let sql = 'update myTasks set status=?, dateStamp=? where id=?';

    db.run(sql, data, function(err) {
        if (err) {
            message = "table not updated";
            return console.error(err.message);
        }
        message = 'Row(s) updated: ${this.changes}';
    });

    db.serialize(function() {
        db.all("select * from myTasks", function(err, allRows) {
            if (err != null) {
                console.log(err);
            }

            fs.writeFileSync("./temp.json", JSON.stringify(allRows, null, 4));
        });
    });

    // close the database connection
    db.close();

    return message;
};