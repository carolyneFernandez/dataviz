var express = require('express');
var router = express.Router();
const models = require('../models');
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;
const City = models.City;
const Wind = models.Wind;
const Data = models.Data;

/**
 * GET wind for five following days for one city
 */
router.get('/forecast/:city', (req, res) => {
  var cityName = req.params.city;
  if (cityName === undefined || cityName === '') {
    return res.status(400).send('Bad request. Please give city name.');
  }

  var date = new Date();
  var todayDay = date.getDate();
  var todayMonth = date.getMonth() + 1;
  var todayYear = date.getFullYear();
  var todayDate = `${todayYear}-${todayMonth}-${todayDay} 00:00:00.00`;
  var fiveDayAfter = `${todayYear}-${todayMonth}-${todayDay + 5} 00:00:00.00`;
  startDate = new Date(todayDate);
  endDate = new Date(fiveDayAfter);

  City.findOne({
      where: {
        name: cityName,
      },
    })
    .then((findedCity) => {
      var findedCityId = findedCity.id;
      Data.findAll({
          where: {
            cityId: findedCityId,
            dateObj: {
              [Op.between]: [startDate.toISOString(), endDate.toISOString()],
            },
          },
          include: [Wind],
        })
        .then((findedData) => {
          return res.status(200).send(findedData);
        })
        .catch((err) => {
          console.log(err);
          return res.status(204).send('Data not found.');
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send('City not found.');
    });
});

module.exports = router;