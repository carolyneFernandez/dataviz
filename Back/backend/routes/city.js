var express = require('express');
var router = express.Router();
const models = require('../models');
const City = models.City;

//GET informations for all cities
router.get('/', function (req, res, next) {
    City.findAll().then((allcities) => {
        res.status(200).send(allcities);
    });
});

module.exports = router;