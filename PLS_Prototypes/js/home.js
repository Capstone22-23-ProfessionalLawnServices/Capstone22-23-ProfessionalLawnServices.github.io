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

    $("#clock-numbers").html(date);
}

function setDates() {

    let date = new Date();
    let day_id = "#day-";
    let dateColors = getDateColors(date);
    let currentMonth = date.getMonth();


    for(let i = 0; i < 14; i++) {
        day_id = day_id.substring(0, day_id.lastIndexOf("-") + 1);
        day_id += i;
        $(day_id).html(date.toDateString());

        if(currentMonth === date.getMonth()) {
            $(day_id).css("background-color", dateColors.headerColor);
            $(day_id).css("color", dateColors.fontColor);
            $(day_id).parent().parent().css("background-color", dateColors.headerColor);
        }
        else {
            $(day_id).css("background-color", dateColors.headerNextColor);
            $(day_id).css("color", dateColors.fontNextColor);
            $(day_id).parent().parent().css("background-color", dateColors.headerNextColor);
        }

        date.setDate(date.getDate() + 1);
    }
}

function getDateColors(date) {

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
        dateColors.headerColor = "#89e3f3";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#ffffff";
        dateColors.fontNextColor = "#000000";
        //$(day_id).css("background-color", "#89e3f3");
        //$(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 3) {
        dateColors.headerColor = "#ffffff";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#274e13";
        dateColors.fontNextColor = "#ffffff";
        //$(day_id).css("background-color", "#ffffff");
    }
    else if(date.getMonth() === 4) {
        dateColors.headerColor = "#274e13";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#b4a7d6";
        dateColors.fontNextColor = "#000000";
        //$(day_id).css("background-color", "#274e13");
        //$(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 5) {
        dateColors.headerColor = "#b4a7d6";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#ff4c4c";
        dateColors.fontNextColor = "#ffffff";
        //$(day_id).css("background-color", "#b4a7d6");

    }
    else if(date.getMonth() === 6) {
        dateColors.headerColor = "#ff4c4c";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#b6d7a8";
        dateColors.fontNextColor = "#000000";

        //$(day_id).css("background-color", "#ff4c4c");
        //$(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 7) {
        dateColors.headerColor = "#b6d7a8";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#0000ff";
        dateColors.fontNextColor = "#ffffff";

        //$(day_id).css("background-color", "#b6d7a8");
    }
    else if(date.getMonth() === 8) {
        dateColors.headerColor = "#0000ff";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#f198b3";
        dateColors.fontNextColor = "#000000";

        //$(day_id).css("background-color", "#0000ff");
        //$(day_id).css("color", "#ffffff");
    }
    else if(date.getMonth() === 9) {
        dateColors.headerColor = "#f198b3";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#ffff90";
        dateColors.fontNextColor = "#000000";

        //$(day_id).css("background-color", "#f198b3");
    }
    else if(date.getMonth() === 10) {
        dateColors.headerColor = "#ffff90";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#23395d";
        dateColors.fontNextColor = "#ffffff";

        //$(day_id).css("background-color", "#ffff90");
    }
    else if(date.getMonth() === 11) {
        dateColors.headerColor = "#23395d";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#ba2323";
        dateColors.fontNextColor = "#000000";

        //$(day_id).css("background-color", "#23395d");
        //$(day_id).css("color", "#ffffff");
    }

    return dateColors;
}