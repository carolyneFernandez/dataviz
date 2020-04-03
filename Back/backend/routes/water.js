var express = require('express');
var router = express.Router();
const request = require('request');

/**
 * POUR EAUFRANCE API
 * Qualité cours d'eau d'une ville
 */

router.get('/:city', function (req, res) {
    var cityName = req.params.city;

    request(`http://hubeau.eaufrance.fr/api/v1/qualite_rivieres/station_pc?libelle_commune=${cityName}&pretty`,
        function (error, response, body) {
            try {
                var responseBody = JSON.parse(body);         
            } catch (e) {
                console.error("Parsing error:", e);
            }
            return res.status(200).send(responseBody.data);
        })
})

router.get('/:city/:stationCode', function (req, res) {
    var stationCode = req.params.stationCode;

    request(`http://hubeau.eaufrance.fr/api/v1/qualite_rivieres/analyse_pc?code_station=${stationCode}&libelle_parametre=Nitrates&date_debut_prelevement=2013-01-01&code_qualification=1&pretty`,
        function (error, response, body) {
            var responseBody = JSON.parse(body);
            return res.status(200).send(responseBody.data);
        })
})

module.exports = router;