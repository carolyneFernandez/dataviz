import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { PrevisionService } from '../../services/prevision.service';

@Component({
  selector: 'map-city',
  templateUrl: './map-city.component.html',
  styleUrls: ['./map-city.component.scss'],
})
export class MapCityComponent implements OnInit {
  map;

  constructor(private prevService: PrevisionService) {}

  ngOnInit() {
    this.createMap();
  }

  createMap() {
    this.prevService.getCities().subscribe((data) => {
      const citiesjson = data;

      const zoomLevel = 7;
      this.map = L.map('mapid', {
        center: [48.8566969, 2.3514616],
        zoom: zoomLevel,
      });

      const mainLayer = L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF0YXZpem1ldGVvIiwiYSI6ImNrOG95czBqZjB4c3UzbHJ4ZnBwMWVoM3IifQ.A7hizouI3CZ9lKtR8D8quA',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      );
      mainLayer.addTo(this.map);

      let marker;
      for (let i = 0; i < 98; i++) {
        marker = L.marker([citiesjson[i].lat, citiesjson[i].lon]).bindPopup(
          `<a href='meteo/${citiesjson[i].name}'>${citiesjson[i].name} (département de ${citiesjson[i].department})</a>`
        );
        marker.addTo(this.map);
      }
    });
  }
}
