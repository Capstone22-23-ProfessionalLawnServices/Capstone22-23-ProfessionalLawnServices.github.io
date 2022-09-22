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
