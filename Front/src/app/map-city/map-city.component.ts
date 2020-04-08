import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";

@Component({
  selector: 'map-city',
  templateUrl: './map-city.component.html',
  styleUrls: ['./map-city.component.scss']
})
export class MapCityComponent implements OnInit {
  map;

  constructor() { }

  ngOnInit() {
    this.createMap();
  }

  createMap() {
    const paris = {
      lat: 50.6365654,
      lng: 3.0635282
    };
    const zoomLevel = 13;

    this.map = L.map('mapid', {
      center: [paris.lat, paris.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF0YXZpem1ldGVvIiwiYSI6ImNrOG95czBqZjB4c3UzbHJ4ZnBwMWVoM3IifQ.A7hizouI3CZ9lKtR8D8quA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    });

    const marker = L.marker([50.6365654, 3.0635282]).bindPopup('Lille, FR');

    mainLayer.addTo(this.map);
    marker.addTo(this.map);
  }
}
