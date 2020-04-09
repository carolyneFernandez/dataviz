import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType } from "chart.js";

import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { PrevisionService } from "../../services/prevision.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-graphic-line-multi",
  templateUrl: "./graphic-line-multi.component.html",
  styleUrls: ["./graphic-line-multi.component.scss"],
})
export class GraphicLineMultiComponent implements OnInit {
  public contentEditable: boolean;
  public valueAPI: String;

  public dataCitiesTime: any = [];

  public dateTime: any = [];

  public type: ChartType = "line";

  public labels: Label[] = [];

  public datasets: ChartDataSets[];
  private city: String;

  public options: ChartOptions = {};
  public color = "red";
  public backgroundLine = "rgba(246, 71, 71, 0.5) ";
  public labelType = "Choisir une option";

  constructor(
    private prevService: PrevisionService,
    private route: ActivatedRoute
  ) {
    this.city = this.route.snapshot.paramMap.get("nameCity");
    this.datasets = [
      {
        label: this.labelType,
        data: [],
        borderColor: this.color,
        backgroundColor: [this.backgroundLine],
      },
    ];
    this.labels = [];
  }

  toggleEditable(event) {
    this.dataCitiesTime = [];

    if (event.target.checked) {
      this.contentEditable = true;
      this.valueAPI = event.target.value;
    }

    this.prevService.getAllDataDays(this.city).subscribe((data) => {
      for (let i in data) {
        if (this.valueAPI === "humidity") {
          this.dataCitiesTime.push(data[i].humidity);
          this.color = "red";
          this.backgroundLine = "rgba(240, 52, 52, 0.5) ";
          this.labelType = "Humidité";
        } else if (this.valueAPI === "temperature") {
          this.dataCitiesTime.push(data[i]["Temperature"].value);
          this.color = "yellow";
          this.backgroundLine = "rgba(250, 216, 89, 0.5)";
          this.labelType = "Température";
        } else if (this.valueAPI === "pressure") {
          this.dataCitiesTime.push(data[i].pression);
          this.color = "blue";
          this.backgroundLine = "rgba(31, 58, 147, 0.5) ";
          this.labelType = "Pression";
        } else if (this.valueAPI === "cloud") {
          this.dataCitiesTime.push(data[i]["Cloud"].cover);
          this.color = "green";
          this.backgroundLine = "rgba(135, 211, 124,0.8)";
          this.labelType = "Nuage";
        } else if (this.valueAPI === "precipitation") {
          if (data[i]["Precipitation"].value !== null) {
            this.dataCitiesTime.push(data[i]["Precipitation"].value);
          } else {
            this.dataCitiesTime.push(0);
          }
          this.color = "rgba(118, 93, 105, 1)";
          this.backgroundLine = "rgba(118, 93, 105, 0.5)";
          this.labelType = "Précipitation";
        } else if (this.valueAPI === "wind") {
          this.dataCitiesTime.push(data[i]["Wind"].speed);
          this.color = "rgb(255,165,0)";
          this.backgroundLine = "rgb(255,165,0,0.5)";
          this.labelType = "Vent";
        }

        let dateTemp = data[i].dateObj.split("T")[0];
        let date = new Date(dateTemp);
        let dateString = date.getDate() + "/" + date.getMonth();
        this.dateTime.push(dateString);
      }

      this.datasets = [
        {
          label: this.labelType,
          data: [
            this.dataCitiesTime[0],
            this.dataCitiesTime[1],
            this.dataCitiesTime[2],
            this.dataCitiesTime[3],
            this.dataCitiesTime[4],
          ],
          borderColor: this.color,
          backgroundColor: [this.backgroundLine],
        },
      ];

      this.labels = [
        this.dateTime[0],
        this.dateTime[1],
        this.dateTime[2],
        this.dateTime[3],
        this.dateTime[4],
      ];

      this.dateTime = [];
    });
  }
  ngOnInit() {}
}
