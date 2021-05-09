let reminders = [{
    id : 0,
    work : "",
    date : ""
}];

let ids = 0;

if(reminders.length > 0 || reminders !== undefined){
    ids = reminders[reminders.length - 1].id;
} 

function addReminder(id, work, date) {
    reminders.push({
        id: id,
        work : work,
        date : date
    });
}

function printReminder(reminders) {
    $("#reminders").html("");

    for (let i = 1; i < reminders.length; i++) {
        document.getElementById("reminders").innerHTML += 
        `<div  class="col-7 border border-info">
                <div class="text">
                    <h3>${reminders[i].work}</h3>
                    <h5>${reminders[i].date}</h5>
                </div>
                <div class="select">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                    <button id="btnDelete" onclick="handleDelete(${reminders[i].id})" type="button" class="btn-close" aria-label="Close"></button>
                </div>
        </div>`
    }
}

function searchById (id) {
    for (let i = 0; i < reminders.length; i++) {
      if (reminders[i].id === id) {
        return i;
      }
    }
    return -1;
}

function remove (id) {
    let reminderIndex = searchById(id);
    if (reminderIndex !== -1) {
      reminders.splice(reminderIndex, 1);
    }
}
function clearInputs() {
    let allInputs = $("input");
    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].value = "";
    }
}

function handleDelete (id) {
    remove(id);
    printReminder(reminders);
    clearInputs();
}

function main() {
    $("#btnAdd").on("click", function () {
        ids = ids + 1;
        let work = $("#input-work").val();
        let date = $("#input-date").val();
        let noti = $("#noti")
        
        if ( work === "" ) {
            noti.html("Missing todo!")
        } else if ( date ==="") {
            noti.html("Missing deadline!")
        } else {
            addReminder(ids, work, date);
            clearInputs();
            noti.html("")
            printReminder(reminders);
        }
    })
}

main();