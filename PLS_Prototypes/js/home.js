function timeClock() {
    setTimeout("timeClock()", 1000);
    let now = new Date();
    let date;

    if (now.getHours() > 12) {
        date = (now.getHours() - 12).toString().padStart(2,"0") + ":" +
                now.getMinutes().toString().padStart(2,"0") + ":" +
                now.getSeconds().toString().padStart(2,"0") + " PM";
    }
    else {
        date = now.getHours().toString().padStart(2,"0") + ":" +
                now.getMinutes().toString().padStart(2,"0") + ":" +
                now.getSeconds().toString().padStart(2,"0") + " AM";
    }

    $("#clock_numbers").html(date);
}

function setDates() {

    let date = new Date();
    let day_id = "#day_";
    let dateColors = {
        headerColor: "",
        headerNextColor: "",
        fontColor: "",
        fontNextColor: ""
    };

    if(date.getMonth() === 0) {
        dateColors.headerColor = "#ba2323";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#6a329f";
        dateColors.fontNextColor = "#ffffff";
        //$(day_id).css("background-color", "#ba2323");
    }
    else if(date.getMonth() === 1) {
        dateColors.headerColor = "#6a329f";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#89e3f3";
        dateColors.fontNextColor = "#ffffff";
        //$(day_id).css("background-color", "#6a329f");
        //$(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 2) {
        //$(day_id).css("background-color", "#89e3f3");
        //$(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 3) {
        $(day_id).css("background-color", "#ffffff");
    }
    else if(date.getMonth() === 4) {
        $(day_id).css("background-color", "#274e13");
        $(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 5) {
        $(day_id).css("background-color", "#b4a7d6");

    }
    else if(date.getMonth() === 6) {
        $(day_id).css("background-color", "#ff4c4c");
        $(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 7) {
        $(day_id).css("background-color", "#b6d7a8");
    }
    else if(date.getMonth() === 8) {
        $(day_id).css("background-color", "#0000ff");
        $(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 9) {
        $(day_id).css("background-color", "#f198b3");
    }
    else if(date.getMonth() === 10) {
        $(day_id).css("background-color", "#ffff90");
    }
    else if(date.getMonth() === 11) {
        $(day_id).css("background-color", "#23395d");
        $(day_id).css("color", "#ffffff");
    }

    for(let i = 0; i < 14; i++) {
        day_id = day_id.substring(0, day_id.lastIndexOf("_") + 1);
        day_id += i;
        $(day_id).html(date.toDateString());

        date.setDate(date.getDate() + 1);
    }
}