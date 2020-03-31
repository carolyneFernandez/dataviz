import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrevisionService } from '../services/prevision.service';

@Component({
  selector: 'app-button-city',
  templateUrl: './button-city.component.html',
  styleUrls: ['./button-city.component.scss']
})
export class ButtonCityComponent implements OnInit {
  @Input() city: string;
  @Input() temperature: Float64Array;

  temp: any;
  constructor(private router: Router, private ps: PrevisionService) { }

  ngOnInit(): void {
    this.ps
    .getTemperatureForOneCity("Paris")
    .subscribe(t => {
      this.temp = t
    });
  }

  onClick(navCity) {
    this.router.navigate([`meteo/${navCity}`]);
  }

}
