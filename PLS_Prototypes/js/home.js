function timeClock() {
    setTimeout("timeClock()", 1000);
    let now = new Date();
    let date;

    if (now.getHours() > 12) {
        date = (now.getHours() - 12).toString().padStart(2,"0") + ":";
    }
    else {
        date= now.getHours().toString().padStart(2,"0") + ":";
    }

    date += now.getMinutes().toString().padStart(2,"0") + ":" + now.getSeconds().toString().padStart(2,"0");
    $("#clock_numbers").html(date);
}

function setDates() {

    let date = new Date();
    let day_id = "#day_";

    for(let i = 0; i < 14; i++) {
        date.setDate(date.getDate() + 1);
        day_id = day_id.substring(0, day_id.lastIndexOf("_") + 1);
        day_id += i;
        $(day_id).html(date.toDateString());
    }

}