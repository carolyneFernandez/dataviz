var express = require('express');
const { Sequelize } = require('sequelize');
var router = express.Router();
const models = require("../models");
const Op = Sequelize.Op;
const City = models.City;
const Data = models.Data;
const Wind = models.Wind;

// GET : Donnée du vent pour une ville en particulier
router.get('/forecast/:city', (req, res) => {
    var cityName = req.params.city;
    if (cityName === undefined || cityName === '') {
        return res
            .status(400)
            .send('Mauvaise requête. Veuillez préciser une ville.');
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
            name: cityName
        }
    }).then(findedCity => {
        var findedCityId = findedCity.id;
        Data.findAll({
                where: {
                    cityId: findedCityId,
                    dateObj: {
                        [Op.between]: [startDate.toISOString(), endDate.toISOString()],
                    },
                },
                include: [Wind]
            }).then(findedData => {
                return res.status(200).send(findedData);
            }).catch(err => console.log("Erreur recherhe data pour : ", cityName))
            // return res.send(findedCityId);
    }).catch(err => console.log("Erreur de console : ", err))
})
module.exports = router;