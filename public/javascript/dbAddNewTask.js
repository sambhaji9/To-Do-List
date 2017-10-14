const sqlite3 = require('sqlite3').verbose();


exports.addNewTask = function(taskObj) {
    var message = true;
    // connect to the database
    let db = new sqlite3.Database('toDo.db');

    // insert the data in the table
    db.run('insert into myTasks(task, status) values(?,?)', [taskObj.task, taskObj.status], function(err) {

        // initialize the data array
        data = [];

        if (err) {
            console.error(err.message);
        } else {
            message = false;
        }
    });
    // close the database
    db.close();
    // return the message
    return message;
};