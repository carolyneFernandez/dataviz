var express = require('express');
var router = express.Router();
const request = require('request');
const models = require("../models");
const Data = models.Data;
const City = models.City;
const Temperature = models.Temperature;
const Cloud = models.Cloud;
/**
 * POUR OPENWEATHER DATA
 * TOKEN : 06554607b71839e1b22e07e0fbd2e215
 */

/*GET Data for one city */

router.get('/:city', function(req, res, next) {
    var cityName = req.params.city;
    var apiKey = req.query.apiKey;



    if (apiKey === undefined || apiKey === "") {
        return res.status(403).send("ApiKey is missing. ");
    }

    request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
        function(error, response, body) {
            // On parce le body de l'api weather data
            var responseBody = JSON.parse(body);
            // On récupère ici les infos dont nous avons besoin pour remplir notre base de donnée
            var cityTemperature = (responseBody.main.temp - 273.15).toFixed(2);
            var cityTemperatureMin = (responseBody.main.temp_min - 273.15).toFixed(2);
            var cityTemperatureMax = (responseBody.main.temp_max - 273.15).toFixed(2);
            var cityFeeling = (responseBody.main.feels_like - 273.15).toFixed(2);
            var cityPression = responseBody.main.pressure;
            var cityHumidity = responseBody.main.humidity;
            var citylat = responseBody.coord.lat;
            var cityLon = responseBody.coord.lon;
            var cityWindSpeed = responseBody.wind.speed;
            var cityCloudCover = responseBody.clouds.all;
            var cityCloudName = responseBody.weather.description;

            City.create({
                name: cityName,
                lon: cityLon,
                lat: citylat
            }).then(city => {
                var cityId = city.get("id");
                Temperature.create({
                    value: cityTemperature,
                    value_max: cityTemperatureMax,
                    value_min: cityTemperatureMin,
                    feeling: cityFeeling
                }).then(newTemp => {
                    var tempId = newTemp.get("id");
                    Cloud.create({
                        cover: cityCloudCover,
                        name: cityCloudName
                    }).then(newCloud => {
                        var cloudId = newCloud.get("id");
                        Data.create({
                            pression: cityPression,
                            humidity: cityHumidity,
                            weather: cityCloudName,
                            temperatureId: tempId,
                            cloudId: cloudId,
                            cityId: cityId
                        }).then(newData => {
                            return res.status(200).send(newData);
                        }).catch(err => console.log("erreur création data : ", err))
                    }).catch(err => console.log("Erreur création cloud : ", err))
                }).catch(err => console.log("Erreur creation de température : ", err))
            }).catch(err => console.log("Erreur création de la ville : ", err))
        });

})

module.exports = router;