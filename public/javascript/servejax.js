class Task {
    constructor(task, operation) {
        this.task = task;
        this.operation = operation;
    }

    newOperation() {
        var xmlHttpRequest = new XMLHttpRequest();

        if (!xmlHttpRequest) {
            return false;
        }

        xmlHttpRequest.onreadystatechange = function() {
            if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
                if (xmlHttpRequest.status === 200) {
                    console.log(JSON.parse(xmlHttpRequest.responseText));
                } else {
                    console.error("This is a problem with the request");
                }
            }
        };

        xmlHttpRequest.open("GET", "http://127.0.0.1:3000/" + this.operation + "?task=" + this.task, true);
        xmlHttpRequest.send();
    }
}


function addTask() {
    var taskObj = new Task(document.getElementById("task").value, "add_task");
    taskObj.newOperation();
}