var express = require('express');
const { Sequelize } = require('sequelize');
var router = express.Router();
const models = require('../models');
const Op = Sequelize.Op;
const City = models.City;
const Temperature = models.Temperature;
const Data = models.Data;

/* GET temperature for five following days for one city */
router.get('/forecast/:city', (req, res) => {
  var city = req.params.city;

  if (city === undefined || city === '') {
    return res
      .status(400)
      .send('Mauvaise requête. Veuillez préciser une ville.');
  }

  var date = new Date();
  var todayDay = date.getDate();
  var todayMonth = date.getMonth() + 1;
  var todayYear = date.getFullYear();
  var todayDate = `${todayYear}-${todayMonth}-${todayDay} 11:00:00.00`;
  var fiveDayAfter = `${todayYear}-${todayMonth}-${todayDay + 5} 11:00:00.00`;
  startDate = new Date(todayDate);
  endDate = new Date(fiveDayAfter);
  City.findOne({
    where: {
      name: city,
    },
  })
    .then((cityfinded) => {
      if (cityfinded === undefined) {
        return res.status(404).send('City not found.');
      } else {
        var cityfindedId = cityfinded.get('id');
        Data.findAll({
          where: {
            cityId: cityfindedId,
            dateObj: {
              [Op.between]: [startDate.toISOString(), endDate.toISOString()],
            },
          },
          include: [Temperature],
        })
          .then((findedData) => {
            return res.status(200).send(findedData);
          })
          .catch((err) => {
            console.log(err);
            return res.status(204).send('Data not found.');
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send('City not found.');
    });
});

/* GET temperature for all cities */
router.get('/', function (req, res, next) {
  let finded = [];
  let toSend = [];
  City.findAll().then((allcities) => {
    const promises = [];
    allcities.forEach((cities) => {
      cityid = cities.id;
      cityName = cities.name;
      promises.push(
        Data.findAll({
          where: {
            cityId: cityid,
          },
          include: [City, Temperature],
        })
      );
    });
    Promise.all(promises).then((data) => {
      data.forEach((datum) => finded.push(datum));
      //Parser
      for (i in finded) {
        if (finded[i][0]['City'] != [] && finded[i][0]['City'] != null) {
          toSend.push({
            name: finded[i][0]['City']['dataValues'].name,
            temp: finded[i][0]['Temperature']['dataValues'].value,
            icon: `http://openweathermap.org/img/wn/${finded[i][0]['dataValues'].icon}@2x.png`,
          });
        } else {
          console.log('error on : ' + finded[i]);
          return res.status(204).send('Data not found.');
        }
      }
      console.log(toSend);
      res.status(200).send(toSend);
    });
  });
});

/* GET temperature for one city */
router.get('/:city', function (req, res, next) {
  var city = req.params.city;

  if (city === undefined || city === '') {
    return res.status(400).send('Bad request. Please give city name.');
  }

  City.findOne({
    where: {
      name: city,
    },
  })
    .then((findedCity) => {
      var findedCityID = findedCity.get('id');
      Data.findAll({
        where: {
          cityId: findedCityID,
        },
        include: [Temperature],
      })
        .then((datafinded) => {
          return res.status(200).send(datafinded);
        })
        .catch((err) => {
          console.log('err : ', err);
          return res.status(204).send('Data not found.');
        });
    })
    .catch((err) => {
      console.log('err : ', err);
      return res.status(404).send('City not found.');
    });
});

module.exports = router;
