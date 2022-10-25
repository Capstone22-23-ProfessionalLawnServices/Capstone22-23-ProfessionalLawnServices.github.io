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
        units: "imperial"
    }

    //Loads the connection credentials from the git.ignored json file "connections.json"

    let responseJsonConnections = await fetch("../../../connections.json")
        .then(response => response.json())
        .then(json => {
            return json;
        })

    //For api information: https://openweathermap.org/forecast5

    let urlWeather = responseJsonConnections.production.OWAPIWeatherURL + "lat=" + params.lat + "&lon=" +
        params.long + "&units=" + params.units + "&appid=" + responseJsonConnections.production.OWAPIKey;

    let responseJsonWeather = await fetch(urlWeather, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })

    $(day_id + "0").html(Math.round(Number(responseJsonWeather.main.temp_max)) + "|" +
        Math.round(Number(responseJsonWeather.main.temp_min)));

    let urlForecast = responseJsonConnections.production.OWAPIForecastURL + "lat=" + params.lat + "&lon=" +
        params.long + "&units=" + params.units + "&appid=" + responseJsonConnections.production.OWAPIKey;

    let responseJsonForecast = await fetch(urlForecast, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })

    let prevDt = new Date().getDate() + 1;
    let weekday = 1;
    let tempMin = "200";
    let tempMax = "-100";

    for(let timeInterval of responseJsonForecast.list) {
        let intervalDate = new Date (timeInterval.dt * 1000).getDate();

        if(intervalDate === new Date().getDate()) {
            continue;
        }

        if(prevDt !== intervalDate) {
            day_id = day_id.substring(0, day_id.lastIndexOf("-") + 1) + weekday;

            if(new Date().getDate() === intervalDate){
                $(day_id).html(timeInterval.main.temp_max + "|" + timeInterval.main.temp_min);
            }
            else if(tempMax === tempMin) {
                $(day_id).html(timeInterval.main.temp);
            }
            else {
                $(day_id).html(Math.round(Number(tempMax)) + "|" + Math.round(Number(tempMin)));
            }

            prevDt = intervalDate;
            weekday += 1;
            tempMin = "200";
            tempMax = "-100";
        }

        if(Number(timeInterval.main.temp_max) > Number(tempMax)) {
            tempMax = timeInterval.main.temp_max;
        }

        if(Number(timeInterval.main.temp_min) < Number(tempMin)) {
            tempMin = timeInterval.main.temp_min;
        }

    }

    day_id = day_id.substring(0, day_id.lastIndexOf("-") + 1) + 5;
    $(day_id).html(Math.round(Number(tempMax)) + "|" + Math.round(Number(tempMin)));

}

function moduleInfo(button_id) {

    button_id = "#" + button_id;
    let button_info_id = button_id + "-info";

    if($(button_info_id).css("display") === "none") {
        $(button_id).css("border-radius", "8px 8px 0 0")
        $(button_id).css("margin-bottom", "0")
        $(button_id).css("background", "rgba(109, 152, 171, 45%)")
        $(button_info_id).show();
    }
    else {
        $(button_id).css("border-radius", "8px")
        $(button_id).css("margin-bottom", "5px")
        $(button_id).css("background", "#E9EDF0")
        $(button_info_id).hide();
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