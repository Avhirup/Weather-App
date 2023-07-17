const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

const port = 5000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));

let t = "";
var now = new Date();
let hours = now.getHours();
if (hours < 12) {
    t = t + "Good Morning";
}
else if (hours > 12 && hours < 16) {
    t = t + "Good Afternoon";
}
else {
    t = t + "Good Evening";
}

app.get('/', (req, res) => {
    res.render("home", { greeting: t });
})

app.post('/', (req, res) => {
    const cityName = req.body.location;
    const apiKey = process.env.API_KEY;
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);

            if (weatherData.cod === "404") {
                res.render("error");
            }

            else {
                const city = weatherData.name;
                const lon = weatherData.coord.lon;
                const lat = weatherData.coord.lat;
                const description = weatherData.weather[0].main;
                const icon = weatherData.weather[0].icon;
                const temp = weatherData.main.temp;
                const maxTemp = weatherData.main.temp_max
                const minTemp = weatherData.main.temp_min;
                const humidity = weatherData.main.humidity;
                const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                res.render("main", { cityName: city, lat: lat, lon: lon, description: description, temp: temp, humidity: humidity, maxTemp: maxTemp, minTemp: minTemp, img: imgURL });
            }
        })
    })
})

app.post('/error', (req, res) => {
    res.redirect('/');
})


const server = app.listen(process.env.PORT || 4000);
const portNumber = server.address().port;
console.log(`port is open on ${portNumber}`);