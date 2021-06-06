var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
    //    document.getElementById("demo").innerHTML = xhttp.responseText;
      const resp = JSON.parse(xhttp.responseText)
      document.getElementById("location").innerHTML = resp["city"];
      console.log(xhttp.responseText)
    }
};
xhttp.open("GET", "http://ip-api.com/json/", true);
xhttp.send();