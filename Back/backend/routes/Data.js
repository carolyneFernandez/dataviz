var express = require('express');
var router = express.Router();
const request = require('request');
const models = require('../models');
const Data = models.Data;
const City = models.City;
const Temperature = models.Temperature;
const Cloud = models.Cloud;
/**
 * FOR OPENWEATHER DATA
 * TOKEN : 06554607b71839e1b22e07e0fbd2e215
 */

/*GET data for one city, and put in database */
router.get('/:city', function (req, res, next) {
  var cityName = req.params.city;
  var apiKey = req.query.apiKey;

  if (apiKey === undefined || apiKey === '') {
    return res.status(403).send('ApiKey is missing.');
  }

  request(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    function (error, response, body) {
      // Parser for OpenWeather data
      var responseBody = JSON.parse(body);
      // Get informations we need
      var cityTemperature = (responseBody.main.temp - 273.15).toFixed(2);
      var cityTemperatureMin = (responseBody.main.temp_min - 273.15).toFixed(2);
      var cityTemperatureMax = (responseBody.main.temp_max - 273.15).toFixed(2);
      var cityFeeling = (responseBody.main.feels_like - 273.15).toFixed(2);
      var cityPression = responseBody.main.pressure;
      var cityHumidity = responseBody.main.humidity;
      var citylat = responseBody.coord.lat;
      var cityLon = responseBody.coord.lon;
      var cityCloudCover = responseBody.clouds.all;
      var cityCloudName = responseBody.weather.description;

      City.create({
        name: cityName,
        lon: cityLon,
        lat: citylat,
      })
        .then((city) => {
          var cityId = city.get('id');
          Temperature.create({
            value: cityTemperature,
            value_max: cityTemperatureMax,
            value_min: cityTemperatureMin,
            feeling: cityFeeling,
          })
            .then((newTemp) => {
              var tempId = newTemp.get('id');
              Cloud.create({
                cover: cityCloudCover,
                name: cityCloudName,
              })
                .then((newCloud) => {
                  var cloudId = newCloud.get('id');
                  Data.create({
                    pression: cityPression,
                    humidity: cityHumidity,
                    weather: cityCloudName,
                    temperatureId: tempId,
                    cloudId: cloudId,
                    cityId: cityId,
                  })
                    .then((newData) => {
                      return res.status(200).send(newData);
                    })
                    .catch((err) => {
                      console.log('Error for creation data : ', err);
                      return res.status(409).send('Error creation data.');
                    });
                })
                .catch((err) => {
                  console.log('Error for creation cloud : ', err);
                  return res.status(409).send('Error creation cloud.');
                });
            })
            .catch((err) => {
              console.log('Error for creation temperature : ', err);
              return res.status(409).send('Error creation temperature.');
            });
        })
        .catch((err) => {
          console.log('Error for creation city : ', err);
          return res.status(409).send('Error creation city.');
        });
    }
  );
});

module.exports = router;
