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
    let day_id_content = "#day--content";
    let dateColors = getDateColors(date);
    let currentMonth = date.getMonth();


    for(let i = 0; i < 14; i++) {
        day_id = day_id.substring(0, (day_id.lastIndexOf("-") + 1)) + i;
        day_id_content = day_id_content.substring(0, day_id_content.indexOf("-") + 1) + i +
            day_id_content.substring(day_id_content.lastIndexOf("-"));
        $(day_id).html(date.toDateString());

        if(currentMonth === date.getMonth()) {
            $(day_id).css("background-color", dateColors.headerColor);
            $(day_id).css("color", dateColors.fontColor);
            $(day_id).parent().parent().css("background-color", dateColors.headerColor);
            $(day_id_content).children().css("background-color", dateColors.contentRgb);
        }
        else {
            $(day_id).css("background-color", dateColors.headerNextColor);
            $(day_id).css("color", dateColors.fontNextColor);
            $(day_id).parent().parent().css("background-color", dateColors.headerNextColor);
            $(day_id_content).children().css("background-color", dateColors.contentNextRgb);
        }

        date.setDate(date.getDate() + 1);
    }
}

function getDateColors(date) {

    let dateColors = {
        headerColor: "",
        headerNextColor: "",
        contentRgb: "",
        fontColor: "",
        fontNextColor: "",
        contentNextRgb: ""
    };

    if((date.getMonth() % 2) === 0) {
        dateColors.headerColor = "rgb(235, 170, 61)";
        dateColors.fontColor = "#000000";
        dateColors.contentRgb = "rgb(235, 170, 61, 65%)";
        dateColors.headerNextColor = "rgb(109, 152, 171)";
        dateColors.fontNextColor = "#000000";
        dateColors.contentNextRgb = "rgb(109, 152, 171, 60%)";
    }
    else if((date.getMonth() % 2) === 1) {
        dateColors.headerColor = "rgb(109, 152, 171)";
        dateColors.fontColor = "#000000";
        dateColors.contentRgb = "rgb(109, 152, 171, 60%)";
        dateColors.headerNextColor = "rgb(235, 170, 61)";
        dateColors.fontNextColor = "#000000";
        dateColors.contentNextRgb = "rgb(235, 170, 61, 65%)";
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
    let day_0_String = $(day_id + "0-info").html();

    let day_0_String1 = day_0_String.substring(day_0_String, day_0_String.indexOf(":") + 1);
    day_0_String = day_0_String.substring(day_0_String.indexOf(":") + 1)
    let day_0_String2 = day_0_String.substring(0, day_0_String.indexOf(":") + 1);
    day_0_String = day_0_String.substring(day_0_String.indexOf(":") + 1)

    day_0_String1 += " " + responseJsonWeather.main.humidity;
    day_0_String2 += " " + responseJsonWeather.weather[0].description;

    day_0_String = day_0_String1 + day_0_String2 + day_0_String;


    $(day_id + "0-info").html(day_0_String);

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

    //Sets the max, min, and info for weather modules 1-5

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
        $(button_id).css("border-radius", "8px 8px 0 0");
        $(button_id).css("margin-bottom", "0");
        $(button_id).css("background-color",
            $(button_id).parent().parent().parent().css("background-color"));
        $(button_info_id).show();
    }
    else {
        let background_color = $(button_id).css("background-color").toString().substring(0,
            ($(button_id).css("background-color").toString().length - 1));

        if(background_color.indexOf("235") > -1) {
            background_color = background_color + ", 65%)";
        }
        else {
            background_color = background_color + ", 60%)";
        }

        $(button_id).css("border-radius", "8px");
        $(button_id).css("margin-bottom", "5px");
        $(button_id).css("background-color", background_color);

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