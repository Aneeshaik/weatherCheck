const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
            res.sendFile(__dirname + "/index.html");
        });

app.post("/", function(req, res){
    var cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=53f42fc12b8aa35d81b913b923f8442a";
    https.get(url, function(response){
        response.on("data", function(d){
            const weatherData = JSON.parse(d);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherCondition = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const cloudIcon = "http://openweathermap.org/img/wn/" + icon  + "@2x.png";
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degree celsius.</h1>");
            res.write("<p>The weather condition is " + weatherCondition + ".</p>");
            res.write("<img src=" + cloudIcon + ">");
        });
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});