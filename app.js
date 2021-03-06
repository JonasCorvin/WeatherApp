const express= require("express");
const https=require("https");
const bodyParser= require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){

  res.sendFile(__dirname+"/index.html")

app.post("/",function(req,res){

  const city=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=&units=metric"


  https.get(url, function(response)
  {
    console.log(response.statusCode);
    response.on("data", function (data)
    {
      const weatherData= JSON.parse(data);
      const temp=weatherData.main.temp;
      const desc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>Temperature: "+temp+"</h1>");
      res.write("Weather Description: "+desc);
      res.write("<img src="+imageUrl+ ">");
      res.send();
    })
})


  })






});

app.listen(3000, function() {
  console.log("Server is online.");
});
