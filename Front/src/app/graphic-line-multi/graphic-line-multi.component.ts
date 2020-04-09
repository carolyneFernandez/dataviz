import { Component, OnInit, Input } from "@angular/core";
import { Chart, ChartOptions, ChartType } from "chart.js";

import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";
import { PrevisionService } from "../services/prevision.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-graphic-line-multi",
  templateUrl: "./graphic-line-multi.component.html",
  styleUrls: ["./graphic-line-multi.component.scss"],
})
export class GraphicLineMultiComponent implements OnInit {
  public contentEditable;
  public valuerAPi;

  public dataCitieTime: any = [];

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
    this.city = this.route.snapshot.paramMap.get("idcity");
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
    this.dataCitieTime = [];

    if (event.target.checked) {
      this.contentEditable = true;
      this.valuerAPi = event.target.value;
    }

    this.prevService.getAllDataDays(this.city).subscribe((data) => {
      for (let i in data) {
        if (this.valuerAPi == "humydite") {
          this.dataCitieTime.push(data[i].humidity);
          this.color = "red";
          this.backgroundLine = "rgba(240, 52, 52, 0.5) ";
          this.labelType = "Humidité";
        } else if (this.valuerAPi == "temperature") {
          this.dataCitieTime.push(data[i]["Temperature"].value);
          this.color = "yellow";
          this.backgroundLine = "rgba(250, 216, 89, 0.5)";
          this.labelType = "Température";
        } else if (this.valuerAPi == "pression") {
          this.dataCitieTime.push(data[i].pression);
          this.color = "blue";
          this.backgroundLine = "rgba(31, 58, 147, 0.5) ";
          this.labelType = "Pression";
        } else if (this.valuerAPi == "cloud") {
          this.dataCitieTime.push(data[i]["Cloud"].cover);
          this.color = "green";
          this.backgroundLine = "rgba(135, 211, 124,0.8)";
          this.labelType = "Nuage";
        } else if (this.valuerAPi == "precipitation") {
          if (data[i]["Precipitation"].value !== null) {
            this.dataCitieTime.push(data[i]["Precipitation"].value);
          } else {
            this.dataCitieTime.push(0);
          }
          this.color = "rgba(118, 93, 105, 1)";
          this.backgroundLine = "rgba(118, 93, 105, 0.5)";
          this.labelType = "Précipitation";
        } else if (this.valuerAPi == "wind") {
          this.dataCitieTime.push(data[i]["Wind"].speed);
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
            this.dataCitieTime[0],
            this.dataCitieTime[1],
            this.dataCitieTime[2],
            this.dataCitieTime[3],
            this.dataCitieTime[4],
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
