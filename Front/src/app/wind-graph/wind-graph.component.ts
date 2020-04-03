import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'wind-graph',
  templateUrl: './wind-graph.component.html',
  styleUrls: ['./wind-graph.component.scss']
})
export class WindGraphComponent implements OnInit {
  public city: any;

  constructor(private router: Router, private elementRef: ElementRef) {

    // this.city = this.router.getCurrentNavigation().extras.state.myCity;
    // Ici on récupère la ville depuis le service.
  }

  ngOnInit(): void {
    this.initChart(this.city);
  }

  initChart(city) {
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
