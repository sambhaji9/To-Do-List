$(document).ready(function() {

    // get the tasks list and load in tbody
    getTasksList();

    $("body").on("change", "input[type='checkbox']", function() {
        // get the row id
        var rowId = $(this).closest("tr").attr("id");
        // get the row
        var row = $(this).closest("tr")[0].children[1];

        // get the checkbox id
        var checkBox = "checkBox_".concat(rowId);
        // find out the checkbox ticked status
        var tickStatus = $("#" + checkBox).is(":checked");

        // strikeout the sentence, if ticked
        if (tickStatus) {
            row.style.textDecoration = "line-through";
            row.style.textDecorationColor = "red";
        } else {
            row.style.textDecoration = "none";
        }

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

    $("#tBodyList").click(function() {
        console.log("clicked on td");
    });

    $("#search").keyup(function() {
        // get the text from the search box
        var searchText = document.getElementById("search").value;

        // get the reference to the table
        var tBodyList = document.getElementById("tBodyList");
        // get the array of rows in the list
        var rowArray = tBodyList.children;
        // find count of the rows
        var rowCount = rowArray.length;

        // iterate over the array
        for (var item = 0; item < rowCount; item++) {
            // get the text from the row
            var text = rowArray[item].children[1].innerHTML;
            if (text.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                rowArray[item].style.display = "";
            } else {
                // hide the row, if text not matching
                rowArray[item].style.display = "none";
            }
        }
    });
});

/**
 * function adding tasks in the list.
 */
function addTask() {
    var xmlHttpRequest = new XMLHttpRequest();

    if (!xmlHttpRequest) {
        return false;
    }

    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
            if (xmlHttpRequest.status === 200) {
                // load the tasks list
                loadList(xmlHttpRequest.responseText);
                // make the input field empty
                document.getElementById("task").value = "";
            } else {
                console.error("This is a problem with the request");
            }
        }
    };

    xmlHttpRequest.open("GET", "http://127.0.0.1:3000/add_task" + "?task=" + document.getElementById("task").value, true);
    xmlHttpRequest.send();
}

/** function getting the complete list of the tasks */
function getTasksList() {
    var xmlHttpRequest = new XMLHttpRequest();

    if (!xmlHttpRequest) {
        return false;
    }

    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
            if (xmlHttpRequest.status === 200) {
                // load the complete list of tasks
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

        if (data[node].status === "1") {
            taskCell.style.textDecoration = "line-through";
            taskCell.style.textDecorationColor = "red";
        }

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