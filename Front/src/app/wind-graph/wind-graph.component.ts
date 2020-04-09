import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { PrevisionService } from '../services/prevision.service';

@Component({
  selector: 'wind-graph',
  templateUrl: './wind-graph.component.html',
  styleUrls: ['./wind-graph.component.scss'],
})
export class WindGraphComponent implements OnInit {
  public city: any;
  public wind: any;
  public temp: any;
  public precipitation: any;

  constructor(private route: ActivatedRoute, private elementRef: ElementRef, private pService: PrevisionService) {

    this.city = this.route.snapshot.paramMap.get('idcity');
    console.log(this.city);
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('idcity');
    this.initChart(this.city);
  }

  initChart(city) {
    let ventViolent = 0;
    let ventTempetueux = 0;
    let pluie = 0;
    let canicule = 0;
    let neige = 0;
    this.pService.getWindForOneCity(city).subscribe((data) => {
      this.wind = data;
      this.wind.forEach((element) => {
        if (+element.Wind.speed > 40 && +element.Wind.speed < 60) {
          ventViolent++;
        }
        if (+element.Wind.speed > 60) {
          ventTempetueux++;
        }
      });
      this.pService.getTemperatureForOneCity(city).subscribe(
          data => {
            this.temp = data;
            this.temp.forEach(element => {
              if (+element.Temperature.value_max > 30) {
                canicule++;
              }
            });
            this.pService.getPrecipitationsForOneCity(city).subscribe(
              data => {
                this.precipitation = data;
                this.precipitation.forEach(element => {
                  if (element.Precipitation.mode == 'rain') {
                    pluie++;
                  } else if (element.Precipitation.mode == 'snow') {
                    neige++;
                  }
                });
                const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
                const myBarChart = new Chart(htmlRef, {
                  type: 'bar',
                  data: {
                    labels: ['Vent violent', 'Vent tempétueux', 'Pluie', 'Canicule', 'Neige'],
                    datasets: [
                      {
                        label: 'Nombre de jours',
                        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
                        data: [ventViolent, ventTempetueux, pluie, canicule, neige]
                      }
                    ]
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: false },
                    title: {
                      display: false},
                  }
                });
              }
            );
          }
        );
      });
    })
  }
}
