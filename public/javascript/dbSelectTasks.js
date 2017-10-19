var fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

exports.getTasksList = function() {
    var db = new sqlite3.Database("toDo.db", sqlite3.OPEN_READONLY);

    db.serialize(function() {
        db.all("select * from myTasks", function(err, allRows) {
            if (err != null) {
                console.log(err);
            }

            fs.writeFileSync("./temp.json", JSON.stringify(allRows, null, 4));

            db.close();
            return allRows;
        });
    });
};