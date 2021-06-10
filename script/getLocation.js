// first we find location from ip


// then we find lat and long from city name using open cage


// var coordinateRequestString = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=503888b49a1e43619ed65e251778c918";
// var lat = 0.0;
// var long = 0.0;

// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     // Typical action to be performed when the document is ready:
//     //    document.getElementById("demo").innerHTML = xhttp.responseText;
//     // const resp = JSON.parse(xhttp.responseText)
//     // document.getElementById("location").innerHTML = resp["city"];
//     // city = resp["city"];
//     // console.log(xhttp.responseText);
//     const resp = JSON.parse(xhttp.responseText);
//     lat = resp.results[0].geometry.lat;
//     long = resp.results[0].geometry.lng;
//     console.log(lat, long);
//   }
// };
// xhttp.open("GET", coordinateRequestString, true);
// xhttp.send();

// then find weather and place data

// var weatherRequestString = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude={part}&appid=90589e3873dc040fbc7af711a3bc474e&units=metric";


// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         // Typical action to be performed when the document is ready:
//         //    document.getElementById("demo").innerHTML = xhttp.responseText;
//         // const resp = JSON.parse(xhttp.responseText)
//         // document.getElementById("location").innerHTML = resp["city"];
//         // city = resp["city"];
//         // console.log(xhttp.responseText);
//         const resp = JSON.parse(xhttp.responseText);
//         console.log(resp);
//     }
// };
// xhttp.open("GET", weatherRequestString, true);
// xhttp.send();




function getIP() {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            //    document.getElementById("demo").innerHTML = xhttp.responseText;
            // const resp = JSON.parse(xhttp.responseText);
            var ip = xhttp.responseText;
            console.log(ip)
            getCity(ip)
        }
    };
    xhttp.open("GET", "https://api.ipify.org", true);
    xhttp.send();

}




function getCity(ip) {
    var ipRequestString = "https://ipapi.co/" + ip + "/json/"
    var xhttp = new XMLHttpRequest();
    var city = "undefined";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            //    document.getElementById("demo").innerHTML = xhttp.responseText;
            const resp = JSON.parse(xhttp.responseText);
            city = resp.city;
            document.getElementById("location").innerHTML = city;
            console.log(xhttp.responseText);
            getCoordinates(city);
        }
    };
    xhttp.open("GET", ipRequestString, true);
    xhttp.send();
}

function getCoordinates(city) {
    var coordinateRequestString = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=503888b49a1e43619ed65e251778c918";
    var lat = 0.0;
    var long = 0.0;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            //    document.getElementById("demo").innerHTML = xhttp.responseText;
            // const resp = JSON.parse(xhttp.responseText)
            // document.getElementById("location").innerHTML = resp["city"];
            // city = resp["city"];
            // console.log(xhttp.responseText);
            const resp = JSON.parse(xhttp.responseText);
            lat = resp.results[0].geometry.lat;
            long = resp.results[0].geometry.lng;
            console.log(lat, long);
            getWeather(lat, long);
        }
    };
    xhttp.open("GET", coordinateRequestString, true);
    xhttp.send();
}

function getWeather(lat, long) {

    var weatherRequestString = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude={part}&appid=90589e3873dc040fbc7af711a3bc474e&units=metric";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            //    document.getElementById("demo").innerHTML = xhttp.responseText;
            // const resp = JSON.parse(xhttp.responseText)
            // document.getElementById("location").innerHTML = resp["city"];
            // city = resp["city"];
            // console.log(xhttp.responseText);
            const resp = JSON.parse(xhttp.responseText);
            console.log(resp);
            parseData(resp);
        }
    };
    xhttp.open("GET", weatherRequestString, true);
    xhttp.send();


}


function parseData(resp) {
    var temp = Math.round(resp.current.temp);
    var condition = resp.current.weather[0].description;
    var speed = Math.round(resp.current.wind_speed * 3.6);
    var tommorow = resp.daily[0].weather[0].description;
    var dayAfterTommorow = resp.daily[1].weather[0].description;
    var dayAfterThat = resp.daily[2].weather[0].description;
    console.log(temp, condition, speed, tommorow, dayAfterTommorow, dayAfterThat);

    fillData(temp, condition, speed, tommorow, dayAfterTommorow, dayAfterThat);
}


function fillData(temp, condition, speed, tommorow, dayAfterTommorow, dayAfterThat) {
    document.getElementById("temp").innerHTML = temp + "°";
    document.getElementById("speed").innerHTML = speed + " kmph";
    document.getElementById("condition").innerHTML = condition;
    document.getElementById("day1").innerHTML = tommorow;
    document.getElementById("day2").innerHTML = dayAfterTommorow;
    document.getElementById("day3").innerHTML = dayAfterThat;

}

// getCity();
getIP();