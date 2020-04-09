import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PrevisionService } from "src/app/services/prevision.service";

@Component({
  selector: "water-info",
  templateUrl: "./water-info.component.html",
  styleUrls: ["./water-info.component.scss"],
})
export class WaterInfoComponent implements OnInit {
  public cityWatersList: any;
  public cityName: String;
  public currentStation: String;
  public stationInfos: any;

  constructor(
    private route: ActivatedRoute,
    private previsionService: PrevisionService
  ) {
    this.cityName = this.route.snapshot.paramMap.get("nameCity");
    this.previsionService.getWatersList(this.cityName).then((data) => {
      this.cityWatersList = data;
    });
  }

  initChart(code_station: String, wording: String) {
    this.stationInfos = null;
    this.currentStation = wording;
    this.previsionService
      .getWaterInfos(this.cityName, code_station)
      .then((result) => (this.stationInfos = result[result.length - 1]))
      .then(() => console.log(this.stationInfos));
  }

  ngOnInit() {}
}
