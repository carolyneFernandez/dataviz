import { Component, OnInit, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as Chart from "chart.js";
import { PrevisionService } from "../../services/prevision.service";

@Component({
  selector: "wind-graph",
  templateUrl: "./wind-graph.component.html",
  styleUrls: ["./wind-graph.component.scss"],
})
export class WindGraphComponent implements OnInit {
  public city: String;
  public wind: any;
  public temp: any;
  public precipitation: any;

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private pService: PrevisionService
  ) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get("nameCity");
    this.initChart(this.city);
  }

  initChart(city: String) {
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
      this.pService.getTemperatureForOneCity(city).subscribe((data) => {
        this.temp = data;
        this.temp.forEach((element) => {
          if (+element.Temperature.value_max > 30) {
            heatWave++;
          }
        });
        this.pService.getPrecipitationsForOneCity(city).subscribe((data) => {
          this.precipitation = data;
          this.precipitation.forEach((element) => {
            if (element.Precipitation.mode === "rain") {
              rain++;
            } else if (element.Precipitation.mode === "snow") {
              snow++;
            }
          });
          const htmlRef = this.elementRef.nativeElement.querySelector(
            `#myChart`
          );
          new Chart(htmlRef, {
            type: "bar",
            data: {
              labels: [
                "Vent violent",
                "Vent tempétueux",
                "Pluie",
                "Forte chaleur",
                "Neige",
              ],
              datasets: [
                {
                  label: "Nombre de jours",
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
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
