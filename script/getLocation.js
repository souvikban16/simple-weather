// first we find location from ip
var xhttp = new XMLHttpRequest();
var city= "Kolkata"
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
    //    document.getElementById("demo").innerHTML = xhttp.responseText;
      const resp = JSON.parse(xhttp.responseText);
      // document.getElementById("location").innerHTML = resp["city"];
      // city = resp["city"];
      city = resp.city;
      document.getElementById("location").innerHTML = city;
      // console.log(xhttp.responseText);
      console.log(city);
    }
};
xhttp.open("GET", "http://ip-api.com/json/", true);
xhttp.send();


// then we find lat and long from city name using open cage


var coordinateRequestString = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=503888b49a1e43619ed65e251778c918";
var lat = 0.0;
var long = 0.0;

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
  }
};
xhttp.open("GET", coordinateRequestString, true);
xhttp.send();

// then find weather and place data

var weatherRequestString = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+long+"&exclude={part}&appid=90589e3873dc040fbc7af711a3bc474e&units=metric";


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
  }
};
xhttp.open("GET", weatherRequestString, true);
xhttp.send();


function getCity(){

  getCoordinates();
}

function getCoordinates(){
  getWeather();
}

function getWeather(){
  
}