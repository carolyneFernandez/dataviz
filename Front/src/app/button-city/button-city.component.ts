import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-city',
  templateUrl: './button-city.component.html',
  styleUrls: ['./button-city.component.scss']
})
export class ButtonCityComponent implements OnInit {
  @Input() city: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(navCity) {
    this.router.navigate([`meteo/${navCity}`]);
  }
}
