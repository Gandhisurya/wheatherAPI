const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname + "/public"))


app.get("/" , function(req , res){
  res.sendFile(__dirname + "/index.html");

  });
  app.post("/" , function(req , res){


  const city = req.body.cityName;
  const apiKey = "00f21b9a2a7199a9a77da959fc6e7e16"
  const unit = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit +"&appid="+ apiKey;

  https.get(url , function(response){
  console.log(response.statusCode);

  response.on("data" , function(data){
  const weatherName = JSON.parse(data);

  const temp = weatherName.main.temp
  const description = weatherName.weather[0].description;
  const icon = weatherName.weather[0].icon;
  const imageURL = " http://openweathermap.org/img/wn/" +icon+"@4x.png";

  res.write("<h1>The Temperature in "+ city  +" is " + temp + " Degree celcius</h1>")
  res.write("<h3>the weather is "+ description + "</h3>")
  res.write("<img src=" +imageURL+ ">");
  res.send();

  })

 });

 });


app.listen(3000 , function(){
  console.log("the server starting at port 3000");
})
