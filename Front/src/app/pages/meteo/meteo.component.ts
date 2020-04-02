import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: "app-meteo",
  templateUrl: "./meteo.component.html",
  styleUrls: ["./meteo.component.scss"],
})
export class MeteoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private elementRef: ElementRef) {
    this.city = this.router.getCurrentNavigation().extras.state.myCity;
  }

  city: string;

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get("idcity");
    this.initChart(this.city);
  }

  onClick() {
    this.router.navigate([`/`]);
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
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: true,
          text: 'Nombre de jours par type de vents'
        }
      }
    });
  }

}
