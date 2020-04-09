var express = require('express');
var router = express.Router();
const models = require('../models');
const {
    Sequelize
} = require('sequelize');
const Op = Sequelize.Op;
const Data = models.Data;
const City = models.City;
const Temperature = models.Temperature;
const Cloud = models.Cloud;
const Wind = models.Wind;
const Precipitation = models.Precipitation;

/**
 * GET all data for one city
 */
router.get('/forecast/:city', function (req, res, next) {
    var cityName = req.params.city;

    if (cityName === undefined || cityName === '') {
        return res.status(403).send('ApiKey is missing.');
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
                    include: [Precipitation, Cloud, Temperature, Wind, City],
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