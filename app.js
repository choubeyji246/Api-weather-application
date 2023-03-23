const express=require("express");
const bodyParser=require("body-parser")
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");


    // res.send("server is up and runnung");
})

app.post("/",function(req,res){

    const cityName= req.body.city;
    
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=5acc1d0043190f7a1c74e7d80cd9783f&units=metric"
    https.get(url,function(response){
        // console.log(response);
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            // console.log(weatherData.main.temp);
            // console.log(weatherData.weather[0].description);
            const imgUrl="http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"
            res.write("<p>The temperature in " + cityName + " is kind of " + weatherData.weather[0].description + "</p>");
            res.write("<h1>The temperatute in " + cityName + " is " + weatherData.main.temp +" degrees celcius </h1>");
            res.write("<img src=" + imgUrl + ">");
            res.send()
        })
    })
   
})


app.listen(3000,function(){
    console.log("server started at port 3000");
})