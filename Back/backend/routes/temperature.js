var express = require('express');
var router = express.Router();
const models = require("../models");

const City = models.City;
const Temperature = models.Temperature;
const Data = models.Data;
// GET temperature of a city

router.get('/:city', function(req, res, next) {
    var city = req.params.city;

    City.findOne({
        where: {
            name: city
        }
    }).then(findedCity => {
        var findedCityID = findedCity.get("id");
        Data.findAll({
            where: {
                cityId: findedCityID
            },
            include: [Temperature]
        }).then(datafinded => {
            return res.status(200).send(datafinded);
        }).catch(err => console.log("err : ", err))

    }).catch(err => console.log("err : ", err))

});

module.exports = router;