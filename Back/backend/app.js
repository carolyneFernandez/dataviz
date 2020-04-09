let express = require('express');
let path = require('path');
let favicon = require('static-favicon');
let CronJob = require('cron').CronJob;
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const request_rp = require('request-promise');
const fs = require('fs');
const parseString = require('xml2js').parseString;
let routes = require('./routes/index');
let datas = require('./routes/data');
let temperatures = require('./routes/temperature');
let precipitations = require('./routes/precipitation');
let clouds = require('./routes/cloud');
let winds = require('./routes/wind');
let cities = require('./routes/city');

// For swagger
const jsyaml = require('js-yaml');
const createSwaggerUiMiddleware = require('@coorpacademy/swagger-ui-express');

const OpenWeatherToken = '06554607b71839e1b22e07e0fbd2e215';

//Models declaration
const models = require('./models');
const Data = models.Data;
const City = models.City;
const Temperature = models.Temperature;
const Cloud = models.Cloud;
const Precipitation = models.Precipitation;
const Wind = models.Wind;
let waters = require('./routes/water');

let cors = require('cors');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const spec = fs.readFileSync(path.resolve(__dirname, 'swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

app.use(
    createSwaggerUiMiddleware({
        swaggerDoc,
        swaggerUi: '/explorer',
    })
);

app.use('/', routes);
app.use('/api/data', datas);
app.use('/api/temperature', temperatures);
app.use('/api/precipitation', precipitations);
app.use('/api/cloud', clouds);
app.use('/api/wind', winds);
app.use('/api/water', waters);
app.use('/api/city', cities);

// Variable for all the information of the cities in the json
let cityCode;
let cityName;
let cityDepartement;
let cityLong;
let cityLat;
// Variables containing the information received from the API
let dateRetrieve;
let cityPressure;
let cityHumidity;
let cityWeather;
let cityIcon;
let cityPrecipitationValue;
let cityPrecipitationMode;
let windDegree;
let windCode;
let windName;
let windSpeed;
let windSpeedName;
let cityTemperature;
let cityTemperatureMin;
let cityTemperatureMax;
let cityTempFeelLike;
let cityCloudValue;
let cityCloudPercent;
// variable for model data when saving
let cityModelData;
let cloudModelData;
let windModelData;
let precipitationModelData;

let options = {};

function fillingDatabaseDay1(
    cityModelData,
    temperatureModelData,
    cloudModelData,
    windModelData,
    precipitationModelData,
    cityName,
    cityPressure,
    cityHumidity,
    cityWeather,
    dateRetrieve,
    cityIcon
) {
    return new Promise(async (resolve) => {
        City.findOne({
            where: {
                name: cityName
            }
        }).then(async cityfinded => {
            if (cityfinded === undefined || cityfinded === '' || cityfinded === null) {
                let newCity = await City.create(cityModelData);
                let newCityID = newCity.id;

                let newTemp = await Temperature.create(temperatureModelData);
                let newTempID = newTemp.id;

                let newWind = await Wind.create(windModelData);
                let newWindID = newWind.id;

                let newCloud = await Cloud.create(cloudModelData);
                let newCloudID = newCloud.id;

                let newPrecipitation = await Precipitation.create(precipitationModelData);
                let newPrecipitationID = newPrecipitation.id;

                let newData = await Data.create({
                    pression: cityPressure,
                    humidity: cityHumidity,
                    weather: cityWeather,
                    dateObj: dateRetrieve,
                    icon: cityIcon,
                    temperatureId: newTempID,
                    windId: newWindID,
                    precipitationId: newPrecipitationID,
                    cloudId: newCloudID,
                    cityId: newCityID,
                });
            } else {
                City.findOne({
                    where: {
                        name: cityName
                    }
                }).then(async findedCity => {
                    let findedCityId = findedCity.id;
                    let datafinded = await Data.findOne({
                        where: {
                            cityId: findedCityId
                        }
                    });
                    let dateRetrieveAPI = new Date(dateRetrieve);
                    if (datafinded.dateObj.toISOString() == dateRetrieveAPI.toISOString()) {
                        let dataLinkTempId = datafinded.temperatureId;
                        let dataLinkWindId = datafinded.windId;
                        let dataLinkPrecipitationId = datafinded.precipitationId;
                        let dataLinkCloudId = datafinded.cloudId;

                        let updateTemp = await Temperature.findOne({
                            where: {
                                id: dataLinkTempId
                            }
                        });
                        updateTemp.value = temperatureModelData.value;
                        updateTemp.value_max = temperatureModelData.value_max;
                        updateTemp.value_min = temperatureModelData.value_min;
                        updateTemp.feeling = temperatureModelData.feeling;
                        updateTemp.save();

                        let updateWind = await Wind.findOne({
                            where: {
                                id: dataLinkWindId
                            }
                        });
                        updateWind.direction_degree = windModelData.direction_degree;
                        updateWind.direction_code = windModelData.direction_code;
                        updateWind.direction_name = windModelData.direction_name;
                        updateWind.speed = windModelData.speed;
                        updateWind.speed_name = windModelData.speed_name;
                        updateWind.save();

                        let updatePrecipitation = await Precipitation.findOne({
                            where: {
                                id: dataLinkPrecipitationId
                            }
                        });
                        updatePrecipitation.value = precipitationModelData.value;
                        updatePrecipitation.mode = precipitationModelData.mode;
                        updatePrecipitation.save();

                        let updateCloud = await Cloud.findOne({
                            where: {
                                id: dataLinkCloudId
                            }
                        });
                        updateCloud.cover = cloudModelData.cover;
                        updateCloud.name = cloudModelData.name;
                        updateCloud.save();

                        datafinded.pression = cityPressure;
                        datafinded.humidity = cityHumidity;
                        datafinded.weather = cityWeather;
                        datafinded.dateObj = dateRetrieve;
                        datafinded.icon = cityIcon;
                        datafinded.save();
                        console.log(`DAY 1, ${cityName} (OK): UPDATED.`);
                    } else {
                        let newTemp = await Temperature.create(temperatureModelData);
                        let newTempID = newTemp.id;

                        let newWind = await Wind.create(windModelData);
                        let newWindID = newWind.id;

                        let newCloud = await Cloud.create(cloudModelData);
                        let newCloudID = newCloud.id;

                        let newPrecipitation = await Precipitation.create(precipitationModelData);
                        let newPrecipitationID = newPrecipitation.id;

                        let newData = await Data.create({
                            pression: cityPressure,
                            humidity: cityHumidity,
                            weather: cityWeather,
                            dateObj: dateRetrieve,
                            icon: cityIcon,
                            temperatureId: newTempID,
                            windId: newWindID,
                            precipitationId: newPrecipitationID,
                            cloudId: newCloudID,
                            cityId: findedCityId
                        });
                        console.log(`DAY 1, ${cityName} (OK): CREATED.`);
                    }
                }).catch(err => console.log('err day 1 : ', err))
            }
        }).catch(err => console.log('err day 1 : ', err))
        resolve('resolved!');
    });
}

function fillingDatabaseDay2(
    temperatureModelData2,
    cloudModelData2,
    windModelData2,
    precipitationModelData2,
    cityName,
    cityPression2,
    cityHumidity2,
    cityWeather2,
    dateRetrieve2,
    cityIcon2
) {
    return new Promise(async (resolve) => {
        City.findOne({
            where: {
                name: cityName
            }
        }).then(async findedCity => {
            let findedCityId = findedCity.id;
            let dateRetrieveAPI = new Date(dateRetrieve2);
            let datafinded = await Data.findOne({
                where: {
                    cityId: findedCityId,
                    dateObj: dateRetrieveAPI.toISOString()
                }
            });

            if (datafinded === null) {
                let newTemp = await Temperature.create(temperatureModelData2);
                let newTempID = newTemp.id;

                let newWind = await Wind.create(windModelData2);
                let newWindID = newWind.id;

                let newCloud = await Cloud.create(cloudModelData2);
                let newCloudID = newCloud.id;

                let newPrecipitation = await Precipitation.create(precipitationModelData2);
                let newPrecipitationID = newPrecipitation.id;

                let newData = await Data.create({
                    pression: cityPression2,
                    humidity: cityHumidity2,
                    weather: cityWeather2,
                    dateObj: dateRetrieve2,
                    icon: cityIcon2,
                    temperatureId: newTempID,
                    windId: newWindID,
                    precipitationId: newPrecipitationID,
                    cloudId: newCloudID,
                    cityId: findedCityId
                });
                console.log(`DAY 2, ${cityName} (OK): CREATED.`);
            } else {
                let dataLinkTempId = datafinded.temperatureId;
                let dataLinkWindId = datafinded.windId;
                let dataLinkPrecipitationId = datafinded.precipitationId;
                let dataLinkCloudId = datafinded.cloudId;

                let updateTemp = await Temperature.findOne({
                    where: {
                        id: dataLinkTempId
                    }
                });
                updateTemp.value = temperatureModelData2.value;
                updateTemp.value_max = temperatureModelData2.value_max;
                updateTemp.value_min = temperatureModelData2.value_min;
                updateTemp.feeling = temperatureModelData2.feeling;
                updateTemp.save();

                let updateWind = await Wind.findOne({
                    where: {
                        id: dataLinkWindId
                    }
                });
                updateWind.direction_degree = windModelData2.direction_degree;
                updateWind.direction_code = windModelData2.direction_code;
                updateWind.direction_name = windModelData2.direction_name;
                updateWind.speed = windModelData2.speed;
                updateWind.speed_name = windModelData2.speed_name;
                updateWind.save();

                let updatePrecipitation = await Precipitation.findOne({
                    where: {
                        id: dataLinkPrecipitationId
                    }
                });
                updatePrecipitation.value = precipitationModelData2.value;
                updatePrecipitation.mode = precipitationModelData2.mode;
                updatePrecipitation.save();

                let updateCloud = await Cloud.findOne({
                    where: {
                        id: dataLinkCloudId
                    }
                });
                updateCloud.cover = cloudModelData2.cover;
                updateCloud.name = cloudModelData2.name;
                updateCloud.save();

                datafinded.pression = cityPression2;
                datafinded.humidity = cityHumidity2;
                datafinded.weather = cityWeather2;
                datafinded.dateObj = dateRetrieve2;
                datafinded.icon = cityIcon2;
                datafinded.save();
                console.log(`DAY 2, ${cityName} (OK): UPDATED.`);
            }
        }).catch(err => console.log('err day 2 : ', err))
        resolve('resolved!');
    });
}

function fillingDatabaseDay3(
    temperatureModelData3,
    cloudModelData3,
    windModelData3,
    precipitationModelData3,
    cityName,
    cityPression3,
    cityHumidity3,
    cityWeather3,
    dateRetrieve3,
    cityIcon3
) {
    return new Promise(async (resolve) => {
        City.findOne({
            where: {
                name: cityName
            }
        }).then(async findedCity => {
            let findedCityId = findedCity.id;
            let dateRetrieveAPI = new Date(dateRetrieve3);
            let datafinded = await Data.findOne({
                where: {
                    cityId: findedCityId,
                    dateObj: dateRetrieveAPI.toISOString()
                }
            });

            if (datafinded === null) {
                let newTemp = await Temperature.create(temperatureModelData3);
                let newTempID = newTemp.id;

                let newWind = await Wind.create(windModelData3);
                let newWindID = newWind.id;

                let newCloud = await Cloud.create(cloudModelData3);
                let newCloudID = newCloud.id;

                let newPrecipitation = await Precipitation.create(precipitationModelData3);
                let newPrecipitationID = newPrecipitation.id;

                let newData = await Data.create({
                    pression: cityPression3,
                    humidity: cityHumidity3,
                    weather: cityWeather3,
                    dateObj: dateRetrieve3,
                    icon: cityIcon3,
                    temperatureId: newTempID,
                    windId: newWindID,
                    precipitationId: newPrecipitationID,
                    cloudId: newCloudID,
                    cityId: findedCityId
                });
                console.log(`DAY 3, ${cityName} (OK): CREATED.`);
            } else {
                let dataLinkTempId = datafinded.temperatureId;
                let dataLinkWindId = datafinded.windId;
                let dataLinkPrecipitationId = datafinded.precipitationId;
                let dataLinkCloudId = datafinded.cloudId;

                let updateTemp = await Temperature.findOne({
                    where: {
                        id: dataLinkTempId
                    }
                });
                updateTemp.value = temperatureModelData3.value;
                updateTemp.value_max = temperatureModelData3.value_max;
                updateTemp.value_min = temperatureModelData3.value_min;
                updateTemp.feeling = temperatureModelData3.feeling;
                updateTemp.save();

                let updateWind = await Wind.findOne({
                    where: {
                        id: dataLinkWindId
                    }
                });
                updateWind.direction_degree = windModelData3.direction_degree;
                updateWind.direction_code = windModelData3.direction_code;
                updateWind.direction_name = windModelData3.direction_name;
                updateWind.speed = windModelData3.speed;
                updateWind.speed_name = windModelData3.speed_name;
                updateWind.save();

                let updatePrecipitation = await Precipitation.findOne({
                    where: {
                        id: dataLinkPrecipitationId
                    }
                });
                updatePrecipitation.value = precipitationModelData3.value;
                updatePrecipitation.mode = precipitationModelData3.mode;
                updatePrecipitation.save();

                let updateCloud = await Cloud.findOne({
                    where: {
                        id: dataLinkCloudId
                    }
                });
                updateCloud.cover = cloudModelData3.cover;
                updateCloud.name = cloudModelData3.name;
                updateCloud.save();

                datafinded.pression = cityPression3;
                datafinded.humidity = cityHumidity3;
                datafinded.weather = cityWeather3;
                datafinded.dateObj = dateRetrieve3;
                datafinded.icon = cityIcon3;
                datafinded.save();
                console.log(`DAY 3, ${cityName} (OK): UPDATED.`);
            }
        }).catch(err => console.log('err day 3 : ', err))
        resolve('resolved!');
    });
}

function fillingDatabaseDay4(
    temperatureModelData4,
    cloudModelData4,
    windModelData4,
    precipitationModelData4,
    cityName,
    cityPression4,
    cityHumidity4,
    cityWeather4,
    dateRetrieve4,
    cityIcon4
) {
    return new Promise(async (resolve) => {
        City.findOne({
            where: {
                name: cityName
            }
        }).then(async findedCity => {
            let findedCityId = findedCity.id;
            let dateRetrieveAPI = new Date(dateRetrieve4);
            let datafinded = await Data.findOne({
                where: {
                    cityId: findedCityId,
                    dateObj: dateRetrieveAPI.toISOString()
                }
            });

            if (datafinded === null) {
                let newTemp = await Temperature.create(temperatureModelData4);
                let newTempID = newTemp.id;

                let newWind = await Wind.create(windModelData4);
                let newWindID = newWind.id;

                let newCloud = await Cloud.create(cloudModelData4);
                let newCloudID = newCloud.id;

                let newPrecipitation = await Precipitation.create(precipitationModelData4);
                let newPrecipitationID = newPrecipitation.id;

                let newData = await Data.create({
                    pression: cityPression4,
                    humidity: cityHumidity4,
                    weather: cityWeather4,
                    dateObj: dateRetrieve4,
                    icon: cityIcon4,
                    temperatureId: newTempID,
                    windId: newWindID,
                    precipitationId: newPrecipitationID,
                    cloudId: newCloudID,
                    cityId: findedCityId
                });
                console.log(`DAY 4, ${cityName} (OK): CREATED.`);
            } else {
                let dataLinkTempId = datafinded.temperatureId;
                let dataLinkWindId = datafinded.windId;
                let dataLinkPrecipitationId = datafinded.precipitationId;
                let dataLinkCloudId = datafinded.cloudId;

                let updateTemp = await Temperature.findOne({
                    where: {
                        id: dataLinkTempId
                    }
                });
                updateTemp.value = temperatureModelData4.value;
                updateTemp.value_max = temperatureModelData4.value_max;
                updateTemp.value_min = temperatureModelData4.value_min;
                updateTemp.feeling = temperatureModelData4.feeling;
                updateTemp.save();

                let updateWind = await Wind.findOne({
                    where: {
                        id: dataLinkWindId
                    }
                });
                updateWind.direction_degree = windModelData4.direction_degree;
                updateWind.direction_code = windModelData4.direction_code;
                updateWind.direction_name = windModelData4.direction_name;
                updateWind.speed = windModelData4.speed;
                updateWind.speed_name = windModelData4.speed_name;
                updateWind.save();

                let updatePrecipitation = await Precipitation.findOne({
                    where: {
                        id: dataLinkPrecipitationId
                    }
                });
                updatePrecipitation.value = precipitationModelData4.value;
                updatePrecipitation.mode = precipitationModelData4.mode;
                updatePrecipitation.save();

                let updateCloud = await Cloud.findOne({
                    where: {
                        id: dataLinkCloudId
                    }
                });
                updateCloud.cover = cloudModelData4.cover;
                updateCloud.name = cloudModelData4.name;
                updateCloud.save();

                datafinded.pression = cityPression4;
                datafinded.humidity = cityHumidity4;
                datafinded.weather = cityWeather4;
                datafinded.dateObj = dateRetrieve4;
                datafinded.icon = cityIcon4;
                datafinded.save();
                console.log(`DAY 4, ${cityName} (OK): UPDATED.`);
            }
        }).catch(err => console.log('err day 4 : ', err))
        resolve('resolved!');
    });
}

function fillingDatabaseDay5(
    temperatureModelData5,
    cloudModelData5,
    windModelData5,
    precipitationModelData5,
    cityName,
    cityPression5,
    cityHumidity5,
    cityWeather5,
    dateRetrieve5,
    cityIcon5
) {
    return new Promise(async (resolve) => {
        City.findOne({
            where: {
                name: cityName
            }
        }).then(async findedCity => {
            let findedCityId = findedCity.id;
            let dateRetrieveAPI = new Date(dateRetrieve5);
            let datafinded = await Data.findOne({
                where: {
                    cityId: findedCityId,
                    dateObj: dateRetrieveAPI.toISOString()
                }
            });

            if (datafinded === null) {
                let newTemp = await Temperature.create(temperatureModelData5);
                let newTempID = newTemp.id;

                let newWind = await Wind.create(windModelData5);
                let newWindID = newWind.id;

                let newCloud = await Cloud.create(cloudModelData5);
                let newCloudID = newCloud.id;

                let newPrecipitation = await Precipitation.create(precipitationModelData5);
                let newPrecipitationID = newPrecipitation.id;

                let newData = await Data.create({
                    pression: cityPression5,
                    humidity: cityHumidity5,
                    weather: cityWeather5,
                    dateObj: dateRetrieve5,
                    icon: cityIcon5,
                    temperatureId: newTempID,
                    windId: newWindID,
                    precipitationId: newPrecipitationID,
                    cloudId: newCloudID,
                    cityId: findedCityId
                });
                console.log(`DAY 5, ${cityName} (OK): CREATED.`);
            } else {
                let dataLinkTempId = datafinded.temperatureId;
                let dataLinkWindId = datafinded.windId;
                let dataLinkPrecipitationId = datafinded.precipitationId;
                let dataLinkCloudId = datafinded.cloudId;

                let updateTemp = await Temperature.findOne({
                    where: {
                        id: dataLinkTempId
                    }
                });
                updateTemp.value = temperatureModelData5.value;
                updateTemp.value_max = temperatureModelData5.value_max;
                updateTemp.value_min = temperatureModelData5.value_min;
                updateTemp.feeling = temperatureModelData5.feeling;
                updateTemp.save();

                let updateWind = await Wind.findOne({
                    where: {
                        id: dataLinkWindId
                    }
                });
                updateWind.direction_degree = windModelData5.direction_degree;
                updateWind.direction_code = windModelData5.direction_code;
                updateWind.direction_name = windModelData5.direction_name;
                updateWind.speed = windModelData5.speed;
                updateWind.speed_name = windModelData5.speed_name;
                updateWind.save();

                let updatePrecipitation = await Precipitation.findOne({
                    where: {
                        id: dataLinkPrecipitationId
                    }
                });
                updatePrecipitation.value = precipitationModelData5.value;
                updatePrecipitation.mode = precipitationModelData5.mode;
                updatePrecipitation.save();

                let updateCloud = await Cloud.findOne({
                    where: {
                        id: dataLinkCloudId
                    }
                });
                updateCloud.cover = cloudModelData5.cover;
                updateCloud.name = cloudModelData5.name;
                updateCloud.save();

                datafinded.pression = cityPression5;
                datafinded.humidity = cityHumidity5;
                datafinded.weather = cityWeather5;
                datafinded.dateObj = dateRetrieve5;
                datafinded.icon = cityIcon5;
                datafinded.save();
                console.log(`DAY 5, ${cityName} (OK): UPDATED.`);
            }
        }).catch(err => console.log('err day 5 : ', err))
        resolve('resolved!');
    });
}
// Asynchrone function for request API and put in database
async function requestAndDb(
    cityName,
    cityCode,
    cityDepartement,
    cityLong,
    cityLat
) {
    // OPTION TO CALL API
    options = {
        uri: 'http://api.openweathermap.org/data/2.5/forecast',
        qs: {
            appid: OpenWeatherToken, // -> uri + '?access_token=xxxxx%20xxxxx'
            q: cityName,
            mode: 'xml',
            lang: 'fr',
            units: 'metric',
        },
        headers: {
            'User-Agent': 'Request-Promise',
        },
        json: true, // Automatically parses the JSON string in the response
    };

    request_rp(options).then((responseBody) => {
        parseString(responseBody, async function (err, result) {
            /******
             * DAY 1
             ******/
            dateRetrieve = result.weatherdata.forecast[0].time[0].$.to;
            cityPressure = result.weatherdata.forecast[0].time[0].pressure[0].$.value;
            cityHumidity = result.weatherdata.forecast[0].time[0].humidity[0].$.value;
            cityWeather = result.weatherdata.forecast[0].time[0].symbol[0].$.name;
            cityIcon = result.weatherdata.forecast[0].time[0].symbol[0].$.var;

            if (
                result.weatherdata.forecast[0].time[0].precipitation[0].$ === undefined
            ) {
                cityPrecipitationValue = null;
                cityPrecipitationMode = '';
            } else {
                cityPrecipitationValue =
                    result.weatherdata.forecast[0].time[0].precipitation[0].$.value;
                cityPrecipitationMode =
                    result.weatherdata.forecast[0].time[0].precipitation[0].$.type;
            }

            windDegree =
                result.weatherdata.forecast[0].time[0].windDirection[0].$.deg;
            windCode = result.weatherdata.forecast[0].time[0].windDirection[0].$.code;
            windName = result.weatherdata.forecast[0].time[0].windDirection[0].$.name;
            windSpeed = result.weatherdata.forecast[0].time[0].windSpeed[0].$.mps;
            windSpeedName =
                result.weatherdata.forecast[0].time[0].windSpeed[0].$.name;

            cityTemperature =
                result.weatherdata.forecast[0].time[0].temperature[0].$.value;
            cityTemperatureMin =
                result.weatherdata.forecast[0].time[0].temperature[0].$.min;
            cityTemperatureMax =
                result.weatherdata.forecast[0].time[0].temperature[0].$.max;
            cityTempFeelLike =
                result.weatherdata.forecast[0].time[0].feels_like[0].$.value;

            cityCloudValue = result.weatherdata.forecast[0].time[0].clouds[0].$.value;
            cityCloudPercent = result.weatherdata.forecast[0].time[0].clouds[0].$.all;

            cityModelData = {
                code_city: cityCode,
                name: cityName,
                department: cityDepartement,
                lon: cityLong,
                lat: cityLat,
            };

            temperatureModelData = {
                value: cityTemperature,
                value_max: cityTemperatureMax,
                value_min: cityTemperatureMin,
                feeling: cityTempFeelLike,
            };

            cloudModelData = {
                cover: cityCloudPercent,
                name: cityCloudValue,
            };

            windModelData = {
                direction_degree: windDegree,
                direction_code: windCode,
                direction_name: windName,
                speed: windSpeed,
                speed_name: windSpeedName,
            };

            precipitationModelData = {
                mode: cityPrecipitationMode,
                value: cityPrecipitationValue,
            };

            await fillingDatabaseDay1(
                cityModelData,
                temperatureModelData,
                cloudModelData,
                windModelData,
                precipitationModelData,
                cityName,
                cityPressure,
                cityHumidity,
                cityWeather,
                dateRetrieve,
                cityIcon
            );

            /******
             * DAY 2
             ******/
            let dateRetrieve2 = result.weatherdata.forecast[0].time[8].$.to;
            let cityPression2 =
                result.weatherdata.forecast[0].time[8].pressure[0].$.value;
            let cityHumidity2 =
                result.weatherdata.forecast[0].time[8].humidity[0].$.value;
            let cityWeather2 =
                result.weatherdata.forecast[0].time[8].symbol[0].$.name;
            let cityIcon2 = result.weatherdata.forecast[0].time[8].symbol[0].$.var;

            let cityPrecipitationValue2;
            let cityPrecipitationMode2;

            if (
                result.weatherdata.forecast[0].time[8].precipitation[0].$ === undefined
            ) {
                cityPrecipitationValue2 = null;
                cityPrecipitationMode2 = '';
            } else {
                cityPrecipitationValue2 =
                    result.weatherdata.forecast[0].time[8].precipitation[0].$.value;
                cityPrecipitationMode2 =
                    result.weatherdata.forecast[0].time[8].precipitation[0].$.type;
            }

            let windDegree2 =
                result.weatherdata.forecast[0].time[8].windDirection[0].$.deg;
            let windCode2 =
                result.weatherdata.forecast[0].time[8].windDirection[0].$.code;
            let windName2 =
                result.weatherdata.forecast[0].time[8].windDirection[0].$.name;
            let windSpeed2 =
                result.weatherdata.forecast[0].time[8].windSpeed[0].$.mps;
            let windSpeedName2 =
                result.weatherdata.forecast[0].time[8].windSpeed[0].$.name;

            let cityTemperature2 =
                result.weatherdata.forecast[0].time[8].temperature[0].$.value;
            let cityTemperatureMin2 =
                result.weatherdata.forecast[0].time[8].temperature[0].$.min;
            let cityTemperatureMax2 =
                result.weatherdata.forecast[0].time[8].temperature[0].$.max;
            let cityTempFeelLike2 =
                result.weatherdata.forecast[0].time[8].feels_like[0].$.value;

            let cityCloudValue2 =
                result.weatherdata.forecast[0].time[8].clouds[0].$.value;
            let cityCloudPercent2 =
                result.weatherdata.forecast[0].time[8].clouds[0].$.all;

            temperatureModelData2 = {
                value: cityTemperature2,
                value_max: cityTemperatureMax2,
                value_min: cityTemperatureMin2,
                feeling: cityTempFeelLike2,
            };

            cloudModelData2 = {
                cover: cityCloudPercent2,
                name: cityCloudValue2,
            };

            windModelData2 = {
                direction_degree: windDegree2,
                direction_code: windCode2,
                direction_name: windName2,
                speed: windSpeed2,
                speed_name: windSpeedName2,
            };

            precipitationModelData2 = {
                mode: cityPrecipitationMode2,
                value: cityPrecipitationValue2,
            };

            setTimeout(
                fillingDatabaseDay2,
                60000,
                temperatureModelData2,
                cloudModelData2,
                windModelData2,
                precipitationModelData2,
                cityName,
                cityPression2,
                cityHumidity2,
                cityWeather2,
                dateRetrieve2,
                cityIcon2
            );


            /***
             * DAY 3
             */
            let dateRetrieve3 = result.weatherdata.forecast[0].time[16].$.to;
            let cityPression3 =
                result.weatherdata.forecast[0].time[16].pressure[0].$.value;
            let cityHumidity3 =
                result.weatherdata.forecast[0].time[16].humidity[0].$.value;
            let cityWeather3 =
                result.weatherdata.forecast[0].time[16].symbol[0].$.name;
            let cityIcon3 = result.weatherdata.forecast[0].time[16].symbol[0].$.var;

            let cityPrecipitationValue3;
            let cityPrecipitationMode3;

            if (
                result.weatherdata.forecast[0].time[16].precipitation[0].$ === undefined
            ) {
                cityPrecipitationValue3 = null;
                cityPrecipitationMode3 = '';
            } else {
                cityPrecipitationValue3 =
                    result.weatherdata.forecast[0].time[16].precipitation[0].$.value;
                cityPrecipitationMode3 =
                    result.weatherdata.forecast[0].time[16].precipitation[0].$.type;
            }

            let windDegree3 =
                result.weatherdata.forecast[0].time[16].windDirection[0].$.deg;
            let windCode3 =
                result.weatherdata.forecast[0].time[16].windDirection[0].$.code;
            let windName3 =
                result.weatherdata.forecast[0].time[16].windDirection[0].$.name;
            let windSpeed3 =
                result.weatherdata.forecast[0].time[16].windSpeed[0].$.mps;
            let windSpeedName3 =
                result.weatherdata.forecast[0].time[16].windSpeed[0].$.name;

            let cityTemperature3 =
                result.weatherdata.forecast[0].time[16].temperature[0].$.value;
            let cityTemperatureMin3 =
                result.weatherdata.forecast[0].time[16].temperature[0].$.min;
            let cityTemperatureMax3 =
                result.weatherdata.forecast[0].time[16].temperature[0].$.max;
            let cityTempFeelLike3 =
                result.weatherdata.forecast[0].time[16].feels_like[0].$.value;

            let cityCloudValue3 =
                result.weatherdata.forecast[0].time[16].clouds[0].$.value;
            let cityCloudPercent3 =
                result.weatherdata.forecast[0].time[16].clouds[0].$.all;

            let temperatureModelData3 = {
                value: cityTemperature3,
                value_max: cityTemperatureMax3,
                value_min: cityTemperatureMin3,
                feeling: cityTempFeelLike3,
            };

            let cloudModelData3 = {
                cover: cityCloudPercent3,
                name: cityCloudValue3,
            };

            let windModelData3 = {
                direction_degree: windDegree3,
                direction_code: windCode3,
                direction_name: windName3,
                speed: windSpeed3,
                speed_name: windSpeedName3,
            };

            let precipitationModelData3 = {
                mode: cityPrecipitationMode3,
                value: cityPrecipitationValue3,
            };

            setTimeout(
                fillingDatabaseDay3,
                120000,
                temperatureModelData3,
                cloudModelData3,
                windModelData3,
                precipitationModelData3,
                cityName,
                cityPression3,
                cityHumidity3,
                cityWeather3,
                dateRetrieve3,
                cityIcon3
            );

            /***
             * QUATRIEME JOUR
             */
            let dateRetrieve4 = result.weatherdata.forecast[0].time[24].$.to;
            let cityPression4 =
                result.weatherdata.forecast[0].time[24].pressure[0].$.value;
            let cityHumidity4 =
                result.weatherdata.forecast[0].time[24].humidity[0].$.value;
            let cityWeather4 =
                result.weatherdata.forecast[0].time[24].symbol[0].$.name;
            let cityIcon4 = result.weatherdata.forecast[0].time[24].symbol[0].$.var;

            let cityPrecipitationValue4;
            let cityPrecipitationMode4;

            if (
                result.weatherdata.forecast[0].time[24].precipitation[0].$ === undefined
            ) {
                cityPrecipitationValue4 = null;
                cityPrecipitationMode4 = '';
            } else {
                cityPrecipitationValue4 =
                    result.weatherdata.forecast[0].time[24].precipitation[0].$.value;
                cityPrecipitationMode4 =
                    result.weatherdata.forecast[0].time[24].precipitation[0].$.type;
            }

            let windDegree4 =
                result.weatherdata.forecast[0].time[24].windDirection[0].$.deg;
            let windCode4 =
                result.weatherdata.forecast[0].time[24].windDirection[0].$.code;
            let windName4 =
                result.weatherdata.forecast[0].time[24].windDirection[0].$.name;
            let windSpeed4 =
                result.weatherdata.forecast[0].time[24].windSpeed[0].$.mps;
            let windSpeedName4 =
                result.weatherdata.forecast[0].time[24].windSpeed[0].$.name;

            let cityTemperature4 =
                result.weatherdata.forecast[0].time[24].temperature[0].$.value;
            let cityTemperatureMin4 =
                result.weatherdata.forecast[0].time[24].temperature[0].$.min;
            let cityTemperatureMax4 =
                result.weatherdata.forecast[0].time[24].temperature[0].$.max;
            let cityTempFeelLike4 =
                result.weatherdata.forecast[0].time[24].feels_like[0].$.value;

            let cityCloudValue4 =
                result.weatherdata.forecast[0].time[24].clouds[0].$.value;
            let cityCloudPercent4 =
                result.weatherdata.forecast[0].time[24].clouds[0].$.all;

            let temperatureModelData4 = {
                value: cityTemperature4,
                value_max: cityTemperatureMax4,
                value_min: cityTemperatureMin4,
                feeling: cityTempFeelLike4,
            };

            let cloudModelData4 = {
                cover: cityCloudPercent4,
                name: cityCloudValue4,
            };

            let windModelData4 = {
                direction_degree: windDegree4,
                direction_code: windCode4,
                direction_name: windName4,
                speed: windSpeed4,
                speed_name: windSpeedName4,
            };

            let precipitationModelData4 = {
                mode: cityPrecipitationMode4,
                value: cityPrecipitationValue4,
            };

            setTimeout(
                fillingDatabaseDay4,
                180000,
                temperatureModelData4,
                cloudModelData4,
                windModelData4,
                precipitationModelData4,
                cityName,
                cityPression4,
                cityHumidity4,
                cityWeather4,
                dateRetrieve4,
                cityIcon4
            );

            /**
             * DAY 5
             */
            let dateRetrieve5 = result.weatherdata.forecast[0].time[32].$.to;
            let cityPression5 =
                result.weatherdata.forecast[0].time[32].pressure[0].$.value;
            let cityHumidity5 =
                result.weatherdata.forecast[0].time[32].humidity[0].$.value;
            let cityWeather5 =
                result.weatherdata.forecast[0].time[32].symbol[0].$.name;
            let cityIcon5 = result.weatherdata.forecast[0].time[32].symbol[0].$.var;

            let cityPrecipitationValue5;
            let cityPrecipitationMode5;

            if (
                result.weatherdata.forecast[0].time[32].precipitation[0].$ === undefined
            ) {
                cityPrecipitationValue5 = null;
                cityPrecipitationMode5 = '';
            } else {
                cityPrecipitationValue5 =
                    result.weatherdata.forecast[0].time[32].precipitation[0].$.value;
                cityPrecipitationMode5 =
                    result.weatherdata.forecast[0].time[32].precipitation[0].$.type;
            }

            let windDegree5 =
                result.weatherdata.forecast[0].time[32].windDirection[0].$.deg;
            let windCode5 =
                result.weatherdata.forecast[0].time[32].windDirection[0].$.code;
            let windName5 =
                result.weatherdata.forecast[0].time[32].windDirection[0].$.name;
            let windSpeed5 =
                result.weatherdata.forecast[0].time[32].windSpeed[0].$.mps;
            let windSpeedName5 =
                result.weatherdata.forecast[0].time[32].windSpeed[0].$.name;

            let cityTemperature5 =
                result.weatherdata.forecast[0].time[32].temperature[0].$.value;
            let cityTemperatureMin5 =
                result.weatherdata.forecast[0].time[32].temperature[0].$.min;
            let cityTemperatureMax5 =
                result.weatherdata.forecast[0].time[32].temperature[0].$.max;
            let cityTempFeelLike5 =
                result.weatherdata.forecast[0].time[32].feels_like[0].$.value;

            let cityCloudValue5 =
                result.weatherdata.forecast[0].time[32].clouds[0].$.value;
            let cityCloudPercent5 =
                result.weatherdata.forecast[0].time[32].clouds[0].$.all;

            let temperatureModelData5 = {
                value: cityTemperature5,
                value_max: cityTemperatureMax5,
                value_min: cityTemperatureMin5,
                feeling: cityTempFeelLike5,
            };

            let cloudModelData5 = {
                cover: cityCloudPercent5,
                name: cityCloudValue5,
            };

            let windModelData5 = {
                direction_degree: windDegree5,
                direction_code: windCode5,
                direction_name: windName5,
                speed: windSpeed5,
                speed_name: windSpeedName5,
            };

            let precipitationModelData5 = {
                mode: cityPrecipitationMode5,
                value: cityPrecipitationValue5,
            };

            setTimeout(
                fillingDatabaseDay5,
                240000,
                temperatureModelData5,
                cloudModelData5,
                windModelData5,
                precipitationModelData5,
                cityName,
                cityPression5,
                cityHumidity5,
                cityWeather5,
                dateRetrieve5,
                cityIcon5
            );
        });
    });
}

async function fillDatabase() {
    fs.readFile('./jsonfile/cities.json', async function (err, allCities) {
        if (err) {
            console.log('Error to open file : ', err);
        }
        if (allCities === undefined) {
            console.log('Error : no city or file was found.');
        }
        let allCitiesInfo = JSON.parse(allCities);
        for (let i = 0; i < allCitiesInfo.length; i++) {
            cityCode = allCitiesInfo[i].code_city;
            cityName = allCitiesInfo[i].name;
            cityDepartement = allCitiesInfo[i].departement;
            cityLong = allCitiesInfo[i].longitude;
            cityLat = allCitiesInfo[i].latitude;
            await requestAndDb(
                cityName,
                cityCode,
                cityDepartement,
                cityLong,
                cityLat
            );
        }
    });
}

/**
 * Update database every 12am
 */
let updateDatabase = new CronJob({
    cronTime: '0 0 12 1-31 * *',
    onTick: function () {
        console.log('Updating database...');
        fillDatabase();
    },
    start: false,
    timeZone: 'Europe/Paris'
});
updateDatabase.start();

/**
 * Fill database when the server start (=== npm start), ONLY FOR DEMO
 */
fillDatabase();

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
});

module.exports = app;