import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit {
  public city: any;

  constructor(private router: Router) {
    this.city = this.router.getCurrentNavigation().extras.state.myCity;
   }


  ngOnInit(): void {
  }

}