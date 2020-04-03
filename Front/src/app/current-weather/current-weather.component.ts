import { Component, OnInit } from '@angular/core';
import { PrevisionService } from '../services/prevision.service';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  constructor(private prevService: PrevisionService) { }

  weather: number;
  windSpeed: number;
  dateTemp: string;
  date: Date;

  ngOnInit() {
    this.prevService.getTemperatureForOneCity('Paris').subscribe(data => {
      this.dateTemp = data["createdAt"].split('T')[0];
      this.date = new Date(this.dateTemp);
      console.log(this.date);
      this.weather = data["Temperature"].value;
    });
  }

}
