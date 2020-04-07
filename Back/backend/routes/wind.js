var express = require('express');
var router = express.Router();
const models = require('../models');
const City = models.City;
const Wind = models.Wind;
const Data = models.Data;

// GET current wind of a city
router.get('/:city', function (req, res, next) {
  var city = req.params.city;

  /*  var date = new Date();
  var todayDay = date.getDay();
  var todayMonth = date.getMonth() + 1;
  var todayYear = date.getFullYear();
  var todayDate = `${todayYear}-${todayMonth}-${todayDay - 2} 15:00:00.00`;
  startDate = new Date(todayDate); */

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
          //dateObj: startDate.toISOString(),
        },
        include: [Wind],
      })
        .then((datafinded) => {
          return res.status(200).send(datafinded);
        })
        .catch((err) => console.log('err : ', err));
    })
    .catch((err) => console.log('err : ', err));
});

module.exports = router;
