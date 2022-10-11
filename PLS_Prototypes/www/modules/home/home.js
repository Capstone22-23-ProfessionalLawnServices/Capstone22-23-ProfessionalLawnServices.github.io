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
        day_id = day_id.substring(0, day_id.lastIndexOf("-") + 1) + i;
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
    }
    else if(date.getMonth() === 1) {
        dateColors.headerColor = "#6a329f";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#89e3f3";
        dateColors.fontNextColor = "#ffffff";
    }
    else if(date.getMonth() === 2) {
        dateColors.headerColor = "#89e3f3";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#ffffff";
        dateColors.fontNextColor = "#000000";
    }
    else if(date.getMonth() === 3) {
        dateColors.headerColor = "#ffffff";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#274e13";
        dateColors.fontNextColor = "#ffffff";
    }
    else if(date.getMonth() === 4) {
        dateColors.headerColor = "#274e13";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#b4a7d6";
        dateColors.fontNextColor = "#000000";
    }
    else if(date.getMonth() === 5) {
        dateColors.headerColor = "#b4a7d6";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#ff4c4c";
        dateColors.fontNextColor = "#ffffff";
    }
    else if(date.getMonth() === 6) {
        dateColors.headerColor = "#ff4c4c";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#b6d7a8";
        dateColors.fontNextColor = "#000000";
    }
    else if(date.getMonth() === 7) {
        dateColors.headerColor = "#b6d7a8";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#0000ff";
        dateColors.fontNextColor = "#ffffff";
    }
    else if(date.getMonth() === 8) {
        dateColors.headerColor = "#0000ff";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#f198b3";
        dateColors.fontNextColor = "#000000";
    }
    else if(date.getMonth() === 9) {
        dateColors.headerColor = "#f198b3";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#ffff90";
        dateColors.fontNextColor = "#000000";
    }
    else if(date.getMonth() === 10) {
        dateColors.headerColor = "#ffff90";
        dateColors.fontColor = "#000000";
        dateColors.headerNextColor = "#23395d";
        dateColors.fontNextColor = "#ffffff";
    }
    else if(date.getMonth() === 11) {
        dateColors.headerColor = "#23395d";
        dateColors.fontColor = "#ffffff";
        dateColors.headerNextColor = "#ba2323";
        dateColors.fontNextColor = "#000000";
    }

    return dateColors;
}

async function setWeather() {

    let day_id = "#weather-module-day-";
    let params = {
        lat: "34.19",
        long: "-79.76",
        cnt: "40",
        apiKey: "2d1648148731c573db608d8fd90ba660",
        units: "imperial"
    }

    //For api call information: https://openweathermap.org/forecast5

    let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + params.lat + "&lon=" +
        params.long + "&cnt=" + params.cnt + "&appid=" + params.apiKey + "&units=" + params.units;


    let responseJson = await fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })

    let prevDt = -1;
    let weekday = 0;

    for(let timeIntervals of responseJson.list) {
        let intervalDate = new Date (timeIntervals.dt * 1000).getDate();

        if(prevDt != intervalDate) {
            console.log(timeIntervals.main.temp_min)
            day_id = day_id.substring(0, day_id.lastIndexOf("-") + 1) + weekday;
            $(day_id).html(timeIntervals.main.temp_max + "|" + timeIntervals.main.temp_min);
            prevDt = intervalDate;
            weekday++;
        }
    }
}

function startSession() {
    $("#start-session-button").hide();
    $("#client-list").hide();
    $("#client-list-label").hide();
    $("#end-session-button").show();
    $("#active-client").show();
    $("#active-client-label").show();
}

function endSession() {
    $("#end-session-button").hide();
    $("#active-client").hide();
    $("#active-client-label").hide();
    $("#start-session-button").show();
    $("#client-list").show();
    $("#client-list-label").show();
}