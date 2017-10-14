const sqlite3 = require('sqlite3').verbose();
var data;

exports.getTasksList = function(taskObj) {
    // initialize the data
    data = [];

    // connect to the database
    let db = new sqlite3.Database('toDo.db');

    // select the data from the table
    db.all('select * from myTasks', [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        rows.forEach((row) => {
            data.push({
                id: row.id,
                task: row.task,
                status: row.status
            });
        });
    });
    // close the database
    db.close();
    return data;
};