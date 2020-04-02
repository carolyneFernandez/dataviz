import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit {
  public city: any;

  constructor(private router: Router, private elementRef: ElementRef) {

    this.city = this.router.getCurrentNavigation().extras.state.myCity;
  }


  ngOnInit(): void {
    this.initChart(this.city);
  }

  initChart(city) {
    console.log(city);
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    var myBarChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: ["Vent violent", "Vent tempétueux", "Pluie", "Canicule", "Neige"],
        datasets: [
          {
            label: "Nombre de jours",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [2, 1, 0, 5, 2]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Nombre de jours par type de vents'
        }
      }
    });
  }

}