import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType } from "chart.js";

import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { PrevisionService } from "../../services/prevision.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-graphic",
  templateUrl: "./graphic.component.html",
  styleUrls: ["./graphic.component.scss"],
})
export class GraphicComponent implements OnInit {
  public dataCitiesTime: any = [];
  public dataCitiesTimeMin: any = [];
  public dataCitiesTimeMax: any = [];

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
    this.city = this.route.snapshot.paramMap.get("nameCity");
  }

  ngOnInit() {
    this.prevService.getFollowingDays(this.city).subscribe((data) => {
      for (let i in data) {
        this.dataCitiesTime.push(data[i]["Temperature"].value);
        this.dataCitiesTimeMin.push(data[i]["Temperature"].value_min);
        this.dataCitiesTimeMax.push(data[i]["Temperature"].value_max);

        let dateTemp = data[i].dateObj.split("T")[0];
        let date = new Date(dateTemp);
        let dateString = date.getDate() + "/" + date.getMonth();
        this.dateTime.push(dateString);
      }
      this.datasets = [
        {
          label: "Température minimale",
          data: [
            this.dataCitiesTimeMin[0],
            this.dataCitiesTimeMin[1],
            this.dataCitiesTimeMin[2],
            this.dataCitiesTimeMin[3],
            this.dataCitiesTimeMin[4],
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
            this.dataCitiesTime[0],
            this.dataCitiesTime[1],
            this.dataCitiesTime[2],
            this.dataCitiesTime[3],
            this.dataCitiesTime[4],
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
          label: "Température maximale",
          data: [
            this.dataCitiesTimeMax[0],
            this.dataCitiesTimeMax[1],
            this.dataCitiesTimeMax[2],
            this.dataCitiesTimeMax[3],
            this.dataCitiesTimeMax[4],
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
