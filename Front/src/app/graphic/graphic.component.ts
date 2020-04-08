
import { Component, OnInit } from "@angular/core";
import { Chart, ChartOptions, ChartType } from "chart.js";

import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";
import { PrevisionService } from "../services/prevision.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-graphic",
  templateUrl: "./graphic.component.html",
  styleUrls: ["./graphic.component.scss"],
})
export class GraphicComponent implements OnInit {
  public dataCitieTime: any = [];
  public dataCitieTimeMin: any = [];
  public dataCitieTimeMax: any = [];

  public dateTime: any = [];

  public type: ChartType = "bar";

  public labels: Label[] = [];

  public datasets: ChartDataSets[];
  private city: String;

  public options: ChartOptions = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Température",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Journée",
          },
        },
      ],
    },
  };

  constructor(
    private prevService: PrevisionService,
    private route: ActivatedRoute
  ) {
    this.city = this.route.snapshot.paramMap.get("idcity");
  }

  ngOnInit() {
    this.prevService.getFollowingDays(this.city).subscribe((data) => {
      for (let i in data) {
        this.dataCitieTime.push(data[i]["Temperature"].value);
        this.dataCitieTimeMin.push(data[i]["Temperature"].value_min);
        this.dataCitieTimeMax.push(data[i]["Temperature"].value_max);

        let dateTemp = data[i].dateObj.split("T")[0];
        let date = new Date(dateTemp);
        let dateString = date.getDate() + "/" + date.getMonth();
        this.dateTime.push(dateString);
      }
      this.datasets = [
        {
          label: "Température Minimum",
          data: [
            this.dataCitieTimeMin[0],
            this.dataCitieTimeMin[1],
            this.dataCitieTimeMin[2],
            this.dataCitieTimeMin[3],
            this.dataCitieTimeMin[4],
          ],
          backgroundColor: [
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
          ],
          borderColor: [
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
            "rgba(219, 10, 91, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Prévisions",
          data: [
            this.dataCitieTime[0],
            this.dataCitieTime[1],
            this.dataCitieTime[2],
            this.dataCitieTime[3],
            this.dataCitieTime[4],
          ],
          backgroundColor: [
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
          ],
          borderColor: [
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
            "rgba(34, 167, 240, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Température Maximum",
          data: [
            this.dataCitieTimeMax[0],
            this.dataCitieTimeMax[1],
            this.dataCitieTimeMax[2],
            this.dataCitieTimeMax[3],
            this.dataCitieTimeMax[4],
          ],
          backgroundColor: [
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
          ],
          borderColor: [
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
            "rgba(247, 202, 24, 1)",
          ],
          borderWidth: 1,
        },
      ];

      this.labels = [
        this.dateTime[0],
        this.dateTime[1],
        this.dateTime[2],
        this.dateTime[3],
        this.dateTime[4],
      ];
    });
  }
}
