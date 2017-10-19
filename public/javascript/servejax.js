$(document).ready(function() {

    // get the tasks list and load in tbody
    getTasksList();

    $("body").on("change", "input[type='checkbox']", function() {
        // get the row id
        var rowId = $(this).closest("tr").attr("id");
        // get the checkbox id
        var checkBox = "checkBox_".concat(rowId);
        // find out the checkbox ticked status
        var tickStatus = $("#" + checkBox).is(":checked");

        var xmlHttpRequest = new XMLHttpRequest();

        if (!xmlHttpRequest) {
            return false;
        }

        xmlHttpRequest.onreadystatechange = function() {
            if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
                if (xmlHttpRequest.status === 200) {
                    console.log(xmlHttpRequest.responseText);
                } else {
                    console.error("This is a problem with the request");
                }
            }
        };

        xmlHttpRequest.open("GET", "http://127.0.0.1:3000/update_task" + "?rowId=" + rowId + "&tickStatus=" + tickStatus, true);
        xmlHttpRequest.send();
    });
});


function addTask() {
    var xmlHttpRequest = new XMLHttpRequest();

    if (!xmlHttpRequest) {
        return false;
    }

    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
            if (xmlHttpRequest.status === 200) {
                loadList(xmlHttpRequest.responseText);
            } else {
                console.error("This is a problem with the request");
            }
        }
    };

    xmlHttpRequest.open("GET", "http://127.0.0.1:3000/add_task" + "?task=" + document.getElementById("task").value, true);
    xmlHttpRequest.send();
}

function getTasksList() {
    var xmlHttpRequest = new XMLHttpRequest();

    if (!xmlHttpRequest) {
        return false;
    }

    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
            if (xmlHttpRequest.status === 200) {
                loadList(xmlHttpRequest.responseText);
            } else {
                console.error("This is a problem with the request");
            }
        }
    };

    xmlHttpRequest.open("GET", "http://127.0.0.1:3000/select_tasks", true);
    xmlHttpRequest.send();
}

function loadList(list) {
    // get reference to the tbody tag and make it empty
    var tBodyList = document.getElementById("tBodyList");
    tBodyList.innerHTML = "";

    // parse the JSON list
    var data = JSON.parse(list);
    // get the length of the data
    var dataLength = data.length;
    // iterate over the list and add in the list
    for (var node = dataLength - 1; node >= 0; node--) {
        // create row
        var row = document.createElement("tr");
        row.setAttribute("id", data[node].id);

        // create the id cell
        var idCell = document.createElement("td");
        idCell.innerHTML = data[node].id;
        row.appendChild(idCell);

        // create the task cell
        var taskCell = document.createElement("td");
        taskCell.innerHTML = data[node].task;
        row.appendChild(taskCell);

        // create the status cell
        var statusCell = document.createElement("td");
        // create a checkbox
        var checkBox = document.createElement("input");
        // set the type as checkbox
        checkBox.setAttribute("type", "checkbox");
        // set the checkbox id
        checkBox.setAttribute("id", "checkBox_".concat(data[node].id));

        if (data[node].status === "1") {
            checkBox.setAttribute("checked", "true");
        }

        statusCell.appendChild(checkBox);
        row.appendChild(statusCell);

        // append the table row to the tbody list
        tBodyList.appendChild(row);
    }
}