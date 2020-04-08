var express = require('express');
var router = express.Router();
const request = require('request');

/**
 * POUR EAUFRANCE API
 * Qualité cours d'eau d'une ville
 */

router.get('/:city', function (req, res) {
    var cityName = req.params.city;

    String.prototype.allReplace = function (obj) {
        var retStr = this;
        for (var x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    //Problème d'utilisation des accents par l'API
    if (cityName == "Saint-Lô") {
        cityName = "St-L%C3%B4";
    }
    cityName = cityName.allReplace({
        'é': 'e',
        'è': 'e',
        'ê': 'e',
        'à': 'a',
        'É': 'E',
        'È': 'E',
        'ö': 'o',
        'â': 'a',
        'ç': 'c'
    });

    request(`https://hubeau.eaufrance.fr/api/v1/qualite_rivieres/station_pc?libelle_commune=${cityName}&pretty`,
        function (error, response, body) {
            try {
                var responseBody = JSON.parse(body);
                return res.status(200).send(responseBody.data);
            } catch (error) {
                console.log('Erreur : ', error);
            }
        })
})

router.get('/:city/:stationCode', function (req, res) {
    var stationCode = req.params.stationCode;

    request(`http://hubeau.eaufrance.fr/api/v1/qualite_rivieres/analyse_pc?code_station=${stationCode}&libelle_parametre=Nitrates&date_debut_prelevement=2013-01-01&code_qualification=0&pretty`,
        function (error, response, body) {
            try {
                var responseBody = JSON.parse(body);
                return res.status(200).send(responseBody.data);
            } catch(error) {
                var responseBody = undefined;
                return res.status(404).send(responseBody);
            }
        })
})

module.exports = router;