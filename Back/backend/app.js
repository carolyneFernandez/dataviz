var express = require('express');
const util = require('util');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const request = require('request');
const request_rp = require('request-promise');
var routes = require('./routes/index');
var users = require('./routes/users');
var datas = require('./routes/Data');
var temperatures = require('./routes/temperature');

/**
 * TOKEN LIST
 * OpenWeather Data : 06554607b71839e1b22e07e0fbd2e215
 */
const OpenWeatherToken = "06554607b71839e1b22e07e0fbd2e215";

//On déclare les models
const models = require("./models");
const Data = models.Data;
const City = models.City;
const Temperature = models.Temperature;
const Cloud = models.Cloud;

const fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/data', datas);
app.use('/api/temperature', temperatures);

// lis toutes les villes dans le json
var cityCode;
var cityName;
var cityDepartement;
var cityLong;
var cityLat;
var options = {};

var date_obj = new Date();
console.log(`DATE = ${date_obj}`);

// fonction qui va êetre appelé asynchonement
function requestAndDb(cityName, cityCode, cityDepartement, cityLong, cityLat) {
    // OPTION POUR APPELLEZ L'API 
    options = {
        uri: 'http://api.openweathermap.org/data/2.5/weather',
        qs: {
            appid: OpenWeatherToken, // -> uri + '?access_token=xxxxx%20xxxxx'
            q: cityName
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return new Promise(resolve => {
        request_rp(options).then(responseBody => {
            var cityTemperature = (responseBody.main.temp - 273.15).toFixed(2);
            var cityTemperatureMin = (responseBody.main.temp_min - 273.15).toFixed(2);
            var cityTemperatureMax = (responseBody.main.temp_max - 273.15).toFixed(2);
            var cityFeeling = (responseBody.main.feels_like - 273.15).toFixed(2);
            var cityPression = responseBody.main.pressure;
            var cityHumidity = responseBody.main.humidity;
            var cityWindSpeed = responseBody.wind.speed;
            var cityCloudCover = responseBody.clouds.all;
            var cityCloudName = responseBody.weather[0].description;

            var cityData = {
                code_city: cityCode,
                name: cityName,
                department: cityDepartement,
                lon: cityLong,
                lat: cityLat
            }

            var temperatureData = {
                value: cityTemperature,
                value_max: cityTemperatureMax,
                value_min: cityTemperatureMin,
                feeling: cityFeeling
            }

            var cloudData = {
                cover: cityCloudCover,
                name: cityCloudName
            }

            City.findOne({ where: { name: cityName } }).then(findedCity => {

                if (findedCity) {
                    var findedCityId = findedCity.get("id");
                    Temperature.create(temperatureData).then(newTemp => {
                        var tempId = newTemp.get("id");
                        Cloud.create(cloudData).then(newCloud => {
                            var cloudId = newCloud.get("id");
                            Data.create({
                                pression: cityPression,
                                humidity: cityHumidity,
                                weather: cityCloudName,
                                temperatureId: tempId,
                                cloudId: cloudId,
                                cityId: findedCityId
                            }).then(newData => {
                                console.log(`${cityName} : UPDATED OK`);
                            }).catch(err => console.log("erreur sur data : ", err))
                        }).catch(err => console.log("erreur sur cloud : ", err));
                    }).catch(err => console.log("erreur sur température : ", err));
                } else {
                    City.create(cityData).then(newCity => {
                        var cityId = newCity.get("id");
                        Temperature.create(temperatureData).then(newTemp => {
                            var tempId = newTemp.get("id");
                            Cloud.create(cloudData).then(newCloud => {
                                var cloudId = newCloud.get("id");
                                Data.create({
                                    pression: cityPression,
                                    humidity: cityHumidity,
                                    weather: cityCloudName,
                                    temperatureId: tempId,
                                    cloudId: cloudId,
                                    cityId: cityId
                                }).then(newData => {
                                    console.log(`${cityName} : OK`);
                                }).catch(err => console.log("erreur sur data : ", err))
                            }).catch(err => console.log("erreur sur cloud : ", err));
                        }).catch(err => console.log("erreur sur température : ", err));
                    }).catch(err => console.log("Erreur création de la ville : ", err));
                }
            }).catch(err => console.log("ERREUR MON FRèRE! : ", err));
        });
        resolve('resolved');
    });
}

const readFile = util.promisify(fs.readFile);

async function readCities() {
    var allCities;
    try {
        allCities = await readFile("./jsonfile/cities.json");
    } catch (err) {
        console.log("ERREUR lecture du fichier de ville : ", err);
    }

    if (allCities === undefined) {
        console.log("Aucune villes");
    }

    try {
        var allCitiesInfo = JSON.parse(allCities);
        console.log('START');
        for (var i = 0; i < allCitiesInfo.length; i++) {
            cityCode = allCitiesInfo[i].code_city;
            cityName = allCitiesInfo[i].name;
            cityDepartement = allCitiesInfo[i].departement;
            cityLong = allCitiesInfo[i].longitude;
            cityLat = allCitiesInfo[i].latitude;
            await requestAndDb(cityName, cityCode, cityDepartement, cityLong, cityLat);
        }
        console.log('END');
    } catch (err) {
        console.log(err);
    }
}

readCities();

/***TEST TEST TEST */
// var options = {
//     uri: 'http://api.openweathermap.org/data/2.5/weather',
//     qs: {
//         appid: OpenWeatherToken, // -> uri + '?access_token=xxxxx%20xxxxx'
//         q: "Paris"
//     },
//     headers: {
//         'User-Agent': 'Request-Promise'
//     },
//     json: true // Automatically parses the JSON string in the response
// };
// request_rp(options)
//     .then(function(responseBody) {
//         console.log('INFO : ', responseBody.main.temp);
//     })
//     .catch(function(err) {
//         // API call failed...
//     });

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;