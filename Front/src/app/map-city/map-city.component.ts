import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { PrevisionService } from "../services/prevision.service";
declare var require: any;
@Component({
  selector: "map-city",
  templateUrl: "./map-city.component.html",
  styleUrls: ["./map-city.component.scss"],
})
export class MapCityComponent implements OnInit {
  map;

  constructor(private prevService: PrevisionService) {}

  ngOnInit() {
    this.createMap();
  }

  createMap() {
    var citiesjson = require("../../assets/cities/cities.json");

    const zoomLevel = 7;
    this.map = L.map("mapid", {
      center: [48.8566969, 2.3514616],
      zoom: zoomLevel,
    });

    const mainLayer = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF0YXZpem1ldGVvIiwiYSI6ImNrOG95czBqZjB4c3UzbHJ4ZnBwMWVoM3IifQ.A7hizouI3CZ9lKtR8D8quA",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    );
    mainLayer.addTo(this.map);

    /* var LeafIcon = L.icon({
      iconUrl: `http://openweathermap.org/img/wn/10d@2x.png`,
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    }); */

    var marker;
    for (var i = 0; i < 98; i++) {
      marker = L.marker([
        citiesjson[i].latitude,
        citiesjson[i].longitude,
      ]).bindPopup(
        `<a href='meteo/${citiesjson[i].name}'>${citiesjson[i].name} (département de ${citiesjson[i].departement})</a>`
      );
      marker.addTo(this.map);
    }
  }
}
