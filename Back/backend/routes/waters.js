var express = require('express');
var router = express.Router();
const request = require('request');

/**
 * POUR EAUFRANCE API
 * Qualité cours d'eau d'une ville
 */

router.get('/:city', function (req, res) {
    var cityName = req.params.city;

    request('http://hubeau.eaufrance.fr/api/v1/qualite_rivieres/station_pc?libelle_commune=Longuyon&pretty',
        function (error, response, body) {
            // var responseBody = JSON.parse(body);
            return res.status(200).send(responseBody.data);
        })
})

module.exports = router;