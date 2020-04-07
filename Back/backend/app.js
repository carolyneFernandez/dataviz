var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const request_rp = require('request-promise');
const fs = require('fs');
const parseString = require('xml2js').parseString;
var routes = require('./routes/index');
var datas = require('./routes/Data');
var temperatures = require('./routes/temperature');
var precipitations = require('./routes/precipitation');
var clouds = require('./routes/cloud');
var winds = require('./routes/wind');

/* For swagger */
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
var cors = require('cors');
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

// variable pour toutes les information des villes dans le json
var cityCode;
var cityName;
var cityDepartement;
var cityLong;
var cityLat;
// Variable pour découper la réponse de l'API
var dateRetrive;
var cityPression;
var cityHumidity;
var cityWeather;
var cityIcon;
var cityPrecipitationValue;
var cityPrecipitationMode;
var windDegree;
var windCode;
var windName;
var windSpeed;
var windSpeedName;
var cityTemperature;
var cityTemperatureMin;
var cityTemperatureMax;
var cityTempFeelLike;
var cityCloudValue;
var cityCloudPercent;
// variable pour les données des modèles lors de l'enregistrement
var cityModelData;
var cloudModelData;
var windModelData;
var precipitationModelData;

var options = {};

function dbRemplissageJour1(
  cityModelData,
  temperatureModelData,
  cloudModelData,
  windModelData,
  precipitationModelData,
  cityName,
  cityPression,
  cityHumidity,
  cityWeather,
  dateRetrive,
  cityIcon
) {
  return new Promise((resolve) => {
    City.findOne({
      where: {
        name: cityName,
      },
    })
      .then((cityfinded) => {
        if (cityfinded === undefined) {
          console.log(`la ville ${cityName} n'existe pas.`);
        } else {
          City.create(cityModelData)
            .then((newCity) => {
              var newcityId = newCity.get('id');
              Temperature.create(temperatureModelData)
                .then((newTemp) => {
                  var newTempId = newTemp.get('id');
                  Cloud.create(cloudModelData)
                    .then((newCloud) => {
                      var newCloudId = newCloud.get('id');
                      Wind.create(windModelData)
                        .then((newWind) => {
                          var newWindId = newWind.get('id');
                          Precipitation.create(precipitationModelData)
                            .then((newPrecipitation) => {
                              var newPrecipitationId = newPrecipitation.get(
                                'id'
                              );
                              Data.create({
                                pression: cityPression,
                                humidity: cityHumidity,
                                weather: cityWeather,
                                dateObj: dateRetrive,
                                icon: cityIcon,
                                temperatureId: newTempId,
                                windId: newWindId,
                                precipitationId: newPrecipitationId,
                                cloudId: newCloudId,
                                cityId: newcityId,
                              })
                                .then((_) => {
                                  console.log(`DAY 1, ${cityName} : OK.`);
                                })
                                .catch((err) => console.log(err));
                            })
                            .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) =>
        console.log(`Erreur rechecherche ville ${cityName} : ${err}.`)
      );
    resolve('resolved!');
  });
}

function dbRemplissageJour2(
  cityModelData2,
  temperatureModelData2,
  cloudModelData2,
  windModelData2,
  precipitationModelData2,
  cityName,
  cityPression2,
  cityHumidity2,
  cityWeather2,
  dateRetrive2,
  cityIcon2
) {
  return new Promise((resolve) => {
    City.findOne({ where: { name: cityName } })
      .then((findedCity) => {
        var findedCityId = findedCity.get('id');
        Temperature.create(temperatureModelData2)
          .then((newTemp) => {
            var newTempId2 = newTemp.get('id');
            Cloud.create(cloudModelData2)
              .then((newCloud) => {
                var newCloudId2 = newCloud.get('id');
                Wind.create(windModelData2)
                  .then((newWind) => {
                    var newWindId2 = newWind.get('id');
                    Precipitation.create(precipitationModelData2)
                      .then((newPrecipitation) => {
                        var newPrecipitationId2 = newPrecipitation.get('id');
                        Data.create({
                          pression: cityPression2,
                          humidity: cityHumidity2,
                          weather: cityWeather2,
                          dateObj: dateRetrive2,
                          icon: cityIcon2,
                          temperatureId: newTempId2,
                          windId: newWindId2,
                          precipitationId: newPrecipitationId2,
                          cloudId: newCloudId2,
                          cityId: findedCityId,
                        }).then((_) => {
                          console.log(`DAY 2, ${cityName}: OK.`);
                        });
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log('ERREUR MON FRèRE! : ', err));
    resolve('resolved!');
  });
}

function dbRemplissageJour3(
  cityModelData3,
  temperatureModelData3,
  cloudModelData3,
  windModelData3,
  precipitationModelData3,
  cityName,
  cityPression3,
  cityHumidity3,
  cityWeather3,
  dateRetrive3,
  cityIcon3
) {
  return new Promise((resolve) => {
    City.findOne({ where: { name: cityName } })
      .then((findedCity) => {
        var findedCityId = findedCity.get('id');
        Temperature.create(temperatureModelData3)
          .then((newTemp) => {
            var newTempId3 = newTemp.get('id');
            Cloud.create(cloudModelData3)
              .then((newCloud) => {
                var newCloudId3 = newCloud.get('id');
                Wind.create(windModelData3)
                  .then((newWind) => {
                    var newWindId3 = newWind.get('id');
                    Precipitation.create(precipitationModelData3)
                      .then((newPrecipitation) => {
                        var newPrecipitationId3 = newPrecipitation.get('id');
                        Data.create({
                          pression: cityPression3,
                          humidity: cityHumidity3,
                          weather: cityWeather3,
                          dateObj: dateRetrive3,
                          icon: cityIcon3,
                          temperatureId: newTempId3,
                          windId: newWindId3,
                          precipitationId: newPrecipitationId3,
                          cloudId: newCloudId3,
                          cityId: findedCityId,
                        }).then((_) => {
                          console.log(`DAY 3, ${cityName}: OK.`);
                        });
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log('ERREUR MON FRèRE! : ', err));
    resolve('resolved!');
  });
}

function dbRemplissageJour4(
  cityModelData4,
  temperatureModelData4,
  cloudModelData4,
  windModelData4,
  precipitationModelData4,
  cityName,
  cityPression4,
  cityHumidity4,
  cityWeather4,
  dateRetrive4,
  cityIcon4
) {
  return new Promise((resolve) => {
    City.findOne({ where: { name: cityName } })
      .then((findedCity) => {
        var findedCityId = findedCity.get('id');
        Temperature.create(temperatureModelData4)
          .then((newTemp) => {
            var newTempId4 = newTemp.get('id');
            Cloud.create(cloudModelData4)
              .then((newCloud) => {
                var newCloudId4 = newCloud.get('id');
                Wind.create(windModelData4)
                  .then((newWind) => {
                    var newWindId4 = newWind.get('id');
                    Precipitation.create(precipitationModelData4)
                      .then((newPrecipitation) => {
                        var newPrecipitationId4 = newPrecipitation.get('id');
                        Data.create({
                          pression: cityPression4,
                          humidity: cityHumidity4,
                          weather: cityWeather4,
                          dateObj: dateRetrive4,
                          icon: cityIcon4,
                          temperatureId: newTempId4,
                          windId: newWindId4,
                          precipitationId: newPrecipitationId4,
                          cloudId: newCloudId4,
                          cityId: findedCityId,
                        }).then((_) => {
                          console.log(`DAY 4, ${cityName}: OK.`);
                        });
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log('ERREUR MON FRèRE! : ', err));
    resolve('resolved!');
  });
}

function dbRemplissageJour5(
  cityModelData5,
  temperatureModelData5,
  cloudModelData5,
  windModelData5,
  precipitationModelData5,
  cityName,
  cityPression5,
  cityHumidity5,
  cityWeather5,
  dateRetrive5,
  cityIcon5
) {
  return new Promise((resolve) => {
    City.findOne({ where: { name: cityName } })
      .then((findedCity) => {
        var findedCityId = findedCity.get('id');
        Temperature.create(temperatureModelData5)
          .then((newTemp) => {
            var newTempId5 = newTemp.get('id');
            Cloud.create(cloudModelData5)
              .then((newCloud) => {
                var newCloudId5 = newCloud.get('id');
                Wind.create(windModelData5)
                  .then((newWind) => {
                    var newWindId5 = newWind.get('id');
                    Precipitation.create(precipitationModelData5)
                      .then((newPrecipitation) => {
                        var newPrecipitationId5 = newPrecipitation.get('id');
                        Data.create({
                          pression: cityPression5,
                          humidity: cityHumidity5,
                          weather: cityWeather5,
                          dateObj: dateRetrive5,
                          icon: cityIcon5,
                          temperatureId: newTempId5,
                          windId: newWindId5,
                          precipitationId: newPrecipitationId5,
                          cloudId: newCloudId5,
                          cityId: findedCityId,
                        }).then((_) => {
                          console.log(`DAY 5, ${cityName}: OK.`);
                        });
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log('ERREUR MON FRèRE! : ', err));
    resolve('resolved!');
  });
}
// fonction qui va êetre appelé asynchonement
async function requestAndDb(
  cityName,
  cityCode,
  cityDepartement,
  cityLong,
  cityLat
) {
  //return new Promise(resolve => {
  // OPTION POUR APPELLEZ L'API
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
       * PREMIER JOUR
       ******/
      dateRetrive = result.weatherdata.forecast[0].time[0].$.to;
      cityPression = result.weatherdata.forecast[0].time[0].pressure[0].$.value;
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
      await dbRemplissageJour1(
        cityModelData,
        temperatureModelData,
        cloudModelData,
        windModelData,
        precipitationModelData,
        cityName,
        cityPression,
        cityHumidity,
        cityWeather,
        dateRetrive,
        cityIcon
      );
      /******
       * DEUXIEME JOUR
       ******/
      var dateRetrive2 = result.weatherdata.forecast[0].time[8].$.to;
      var cityPression2 =
        result.weatherdata.forecast[0].time[8].pressure[0].$.value;
      var cityHumidity2 =
        result.weatherdata.forecast[0].time[8].humidity[0].$.value;
      var cityWeather2 =
        result.weatherdata.forecast[0].time[8].symbol[0].$.name;
      var cityIcon2 = result.weatherdata.forecast[0].time[8].symbol[0].$.var;

      var cityPrecipitationValue2;
      var cityPrecipitationMode2;

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

      var windDegree2 =
        result.weatherdata.forecast[0].time[8].windDirection[0].$.deg;
      var windCode2 =
        result.weatherdata.forecast[0].time[8].windDirection[0].$.code;
      var windName2 =
        result.weatherdata.forecast[0].time[8].windDirection[0].$.name;
      var windSpeed2 =
        result.weatherdata.forecast[0].time[8].windSpeed[0].$.mps;
      var windSpeedName2 =
        result.weatherdata.forecast[0].time[8].windSpeed[0].$.name;

      var cityTemperature2 =
        result.weatherdata.forecast[0].time[8].temperature[0].$.value;
      var cityTemperatureMin2 =
        result.weatherdata.forecast[0].time[8].temperature[0].$.min;
      var cityTemperatureMax2 =
        result.weatherdata.forecast[0].time[8].temperature[0].$.max;
      var cityTempFeelLike2 =
        result.weatherdata.forecast[0].time[8].feels_like[0].$.value;

      var cityCloudValue2 =
        result.weatherdata.forecast[0].time[8].clouds[0].$.value;
      var cityCloudPercent2 =
        result.weatherdata.forecast[0].time[8].clouds[0].$.all;

      cityModelData2 = {
        code_city: cityCode,
        name: cityName,
        department: cityDepartement,
        lon: cityLong,
        lat: cityLat,
      };

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
        dbRemplissageJour2,
        35000,
        cityModelData2,
        temperatureModelData2,
        cloudModelData2,
        windModelData2,
        precipitationModelData2,
        cityName,
        cityPression2,
        cityHumidity2,
        cityWeather2,
        dateRetrive2,
        cityIcon2
      );

      var dateRetrive3 = result.weatherdata.forecast[0].time[16].$.to;
      var cityPression3 =
        result.weatherdata.forecast[0].time[16].pressure[0].$.value;
      var cityHumidity3 =
        result.weatherdata.forecast[0].time[16].humidity[0].$.value;
      var cityWeather3 =
        result.weatherdata.forecast[0].time[16].symbol[0].$.name;
      var cityIcon3 = result.weatherdata.forecast[0].time[16].symbol[0].$.var;

      var cityPrecipitationValue3;
      var cityPrecipitationMode3;

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

      var windDegree3 =
        result.weatherdata.forecast[0].time[16].windDirection[0].$.deg;
      var windCode3 =
        result.weatherdata.forecast[0].time[16].windDirection[0].$.code;
      var windName3 =
        result.weatherdata.forecast[0].time[16].windDirection[0].$.name;
      var windSpeed3 =
        result.weatherdata.forecast[0].time[16].windSpeed[0].$.mps;
      var windSpeedName3 =
        result.weatherdata.forecast[0].time[16].windSpeed[0].$.name;

      var cityTemperature3 =
        result.weatherdata.forecast[0].time[16].temperature[0].$.value;
      var cityTemperatureMin3 =
        result.weatherdata.forecast[0].time[16].temperature[0].$.min;
      var cityTemperatureMax3 =
        result.weatherdata.forecast[0].time[16].temperature[0].$.max;
      var cityTempFeelLike3 =
        result.weatherdata.forecast[0].time[16].feels_like[0].$.value;

      var cityCloudValue3 =
        result.weatherdata.forecast[0].time[16].clouds[0].$.value;
      var cityCloudPercent3 =
        result.weatherdata.forecast[0].time[16].clouds[0].$.all;

      var cityModelData3 = {
        code_city: cityCode,
        name: cityName,
        department: cityDepartement,
        lon: cityLong,
        lat: cityLat,
      };

      var temperatureModelData3 = {
        value: cityTemperature3,
        value_max: cityTemperatureMax3,
        value_min: cityTemperatureMin3,
        feeling: cityTempFeelLike3,
      };

      var cloudModelData3 = {
        cover: cityCloudPercent3,
        name: cityCloudValue3,
      };

      var windModelData3 = {
        direction_degree: windDegree3,
        direction_code: windCode3,
        direction_name: windName3,
        speed: windSpeed3,
        speed_name: windSpeedName3,
      };

      var precipitationModelData3 = {
        mode: cityPrecipitationMode3,
        value: cityPrecipitationValue3,
      };

      setTimeout(
        dbRemplissageJour3,
        70000,
        cityModelData3,
        temperatureModelData3,
        cloudModelData3,
        windModelData3,
        precipitationModelData3,
        cityName,
        cityPression3,
        cityHumidity3,
        cityWeather3,
        dateRetrive3,
        cityIcon3
      );

      /***
       * QUATRIEME JOUR
       */

      var dateRetrive4 = result.weatherdata.forecast[0].time[24].$.to;
      var cityPression4 =
        result.weatherdata.forecast[0].time[24].pressure[0].$.value;
      var cityHumidity4 =
        result.weatherdata.forecast[0].time[24].humidity[0].$.value;
      var cityWeather4 =
        result.weatherdata.forecast[0].time[24].symbol[0].$.name;
      var cityIcon4 = result.weatherdata.forecast[0].time[24].symbol[0].$.var;

      var cityPrecipitationValue4;
      var cityPrecipitationMode4;

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

      var windDegree4 =
        result.weatherdata.forecast[0].time[24].windDirection[0].$.deg;
      var windCode4 =
        result.weatherdata.forecast[0].time[24].windDirection[0].$.code;
      var windName4 =
        result.weatherdata.forecast[0].time[24].windDirection[0].$.name;
      var windSpeed4 =
        result.weatherdata.forecast[0].time[24].windSpeed[0].$.mps;
      var windSpeedName4 =
        result.weatherdata.forecast[0].time[24].windSpeed[0].$.name;

      var cityTemperature4 =
        result.weatherdata.forecast[0].time[24].temperature[0].$.value;
      var cityTemperatureMin4 =
        result.weatherdata.forecast[0].time[24].temperature[0].$.min;
      var cityTemperatureMax4 =
        result.weatherdata.forecast[0].time[24].temperature[0].$.max;
      var cityTempFeelLike4 =
        result.weatherdata.forecast[0].time[24].feels_like[0].$.value;

      var cityCloudValue4 =
        result.weatherdata.forecast[0].time[24].clouds[0].$.value;
      var cityCloudPercent4 =
        result.weatherdata.forecast[0].time[24].clouds[0].$.all;

      var cityModelData4 = {
        code_city: cityCode,
        name: cityName,
        department: cityDepartement,
        lon: cityLong,
        lat: cityLat,
      };

      var temperatureModelData4 = {
        value: cityTemperature4,
        value_max: cityTemperatureMax4,
        value_min: cityTemperatureMin4,
        feeling: cityTempFeelLike4,
      };

      var cloudModelData4 = {
        cover: cityCloudPercent4,
        name: cityCloudValue4,
      };

      var windModelData4 = {
        direction_degree: windDegree4,
        direction_code: windCode4,
        direction_name: windName4,
        speed: windSpeed4,
        speed_name: windSpeedName4,
      };

      var precipitationModelData4 = {
        mode: cityPrecipitationMode4,
        value: cityPrecipitationValue4,
      };

      setTimeout(
        dbRemplissageJour4,
        140000,
        cityModelData4,
        temperatureModelData4,
        cloudModelData4,
        windModelData4,
        precipitationModelData4,
        cityName,
        cityPression4,
        cityHumidity4,
        cityWeather4,
        dateRetrive4,
        cityIcon4
      );
      /**
       * CINQUIEME JOUR
       */
      var dateRetrive5 = result.weatherdata.forecast[0].time[32].$.to;
      var cityPression5 =
        result.weatherdata.forecast[0].time[32].pressure[0].$.value;
      var cityHumidity5 =
        result.weatherdata.forecast[0].time[32].humidity[0].$.value;
      var cityWeather5 =
        result.weatherdata.forecast[0].time[32].symbol[0].$.name;
      var cityIcon5 = result.weatherdata.forecast[0].time[32].symbol[0].$.var;

      var cityPrecipitationValue5;
      var cityPrecipitationMode5;

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

      var windDegree5 =
        result.weatherdata.forecast[0].time[32].windDirection[0].$.deg;
      var windCode5 =
        result.weatherdata.forecast[0].time[32].windDirection[0].$.code;
      var windName5 =
        result.weatherdata.forecast[0].time[32].windDirection[0].$.name;
      var windSpeed5 =
        result.weatherdata.forecast[0].time[32].windSpeed[0].$.mps;
      var windSpeedName5 =
        result.weatherdata.forecast[0].time[32].windSpeed[0].$.name;

      var cityTemperature5 =
        result.weatherdata.forecast[0].time[32].temperature[0].$.value;
      var cityTemperatureMin5 =
        result.weatherdata.forecast[0].time[32].temperature[0].$.min;
      var cityTemperatureMax5 =
        result.weatherdata.forecast[0].time[32].temperature[0].$.max;
      var cityTempFeelLike5 =
        result.weatherdata.forecast[0].time[32].feels_like[0].$.value;

      var cityCloudValue5 =
        result.weatherdata.forecast[0].time[32].clouds[0].$.value;
      var cityCloudPercent5 =
        result.weatherdata.forecast[0].time[32].clouds[0].$.all;

      var cityModelData5 = {
        code_city: cityCode,
        name: cityName,
        department: cityDepartement,
        lon: cityLong,
        lat: cityLat,
      };

      var temperatureModelData5 = {
        value: cityTemperature5,
        value_max: cityTemperatureMax5,
        value_min: cityTemperatureMin5,
        feeling: cityTempFeelLike5,
      };

      var cloudModelData5 = {
        cover: cityCloudPercent5,
        name: cityCloudValue5,
      };

      var windModelData5 = {
        direction_degree: windDegree5,
        direction_code: windCode5,
        direction_name: windName5,
        speed: windSpeed5,
        speed_name: windSpeedName5,
      };

      var precipitationModelData5 = {
        mode: cityPrecipitationMode5,
        value: cityPrecipitationValue5,
      };

      setTimeout(
        dbRemplissageJour5,
        280000,
        cityModelData5,
        temperatureModelData5,
        cloudModelData5,
        windModelData5,
        precipitationModelData5,
        cityName,
        cityPression5,
        cityHumidity5,
        cityWeather5,
        dateRetrive5,
        cityIcon5
      );
    });
  });
}

async function readCities() {
  fs.readFile('./jsonfile/cities.json', async function (err, allCities) {
    if (err) {
      console.log("Erreur à l'ouverture de la base : ", err);
    }
    if (allCities === undefined) {
      console.log('Aucune ville ou fichier trouvé.');
    }
    var allCitiesInfo = JSON.parse(allCities);
    for (var i = 0; i < allCitiesInfo.length; i++) {
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

//readCities();

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
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
