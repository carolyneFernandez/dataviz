import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { PrevisionService } from '../../services/prevision.service';

@Component({
  selector: 'wind-graph',
  templateUrl: './wind-graph.component.html',
  styleUrls: ['./wind-graph.component.scss'],
})
export class WindGraphComponent implements OnInit {
  public city: string;
  public wind: any;
  public temp: any;
  public precipitation: any;

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private pService: PrevisionService
  ) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('nameCity');
    this.initChart(this.city);
  }

  initChart(city: string) {
    let violentWind = 0;
    let stormyWind = 0;
    let rain = 0;
    let heatWave = 0;
    let snow = 0;
    this.pService.getWindForOneCity(city).subscribe((data) => {
      this.wind = data;
      this.wind.forEach((element) => {
        if (+element.Wind.speed > 40 && +element.Wind.speed < 60) {
          violentWind++;
        }
        if (+element.Wind.speed > 60) {
          stormyWind++;
        }
      });
      this.pService.getTemperatureForOneCity(city).subscribe((dataTemperature) => {
        this.temp = dataTemperature;
        this.temp.forEach((element) => {
          if (+element.Temperature.value_max > 30) {
            heatWave++;
          }
        });
        this.pService.getPrecipitationsForOneCity(city).subscribe((dataPrecipitation) => {
          this.precipitation = dataPrecipitation;
          this.precipitation.forEach((element) => {
            if (element.Precipitation.mode === 'rain') {
              rain++;
            } else if (element.Precipitation.mode === 'snow') {
              snow++;
            }
          });
          const htmlRef = this.elementRef.nativeElement.querySelector(
            `#myChart`
          );

          // tslint:disable-next-line: no-unused-expression
          new Chart(htmlRef, {
            type: 'bar',
            data: {
              labels: [
                'Vent violent',
                'Vent tempétueux',
                'Pluie',
                'Forte chaleur',
                'Neige',
              ],
              datasets: [
                {
                  label: 'Nombre de jours',
                  backgroundColor: [
                    '#3e95cd',
                    '#8e5ea2',
                    '#3cba9f',
                    '#e8c3b9',
                    '#c45850',
                  ],
                  data: [violentWind, stormyWind, rain, heatWave, snow],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: { display: false },
              title: {
                display: false,
              },
            },
          });
        });
      });
    });
  }
}
