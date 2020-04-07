import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrevisionService } from 'src/app/services/prevision.service';

@Component({
  selector: 'app-water-info',
  templateUrl: './water-info.component.html',
  styleUrls: ['./water-info.component.scss']
})
export class WaterInfoComponent implements OnInit {
  public cityWatersList: any;
  public cityName: String;
  public currentStation: String;
  public stationInfos: any;

  constructor(private router: Router, private previsionService: PrevisionService) {
    this.cityWatersList = this.router.getCurrentNavigation().extras.state.myCityInfos;
    this.cityName = this.router.getCurrentNavigation().extras.state.cityName;

  }

  initChart(code_station: String, libelle:String) {
    this.stationInfos = null;
    this.currentStation = libelle;
    this.previsionService.getWaterInfos(this.cityName, code_station)
      .then(result => this.stationInfos = result[result.length - 1])
      .then(() => console.log(this.stationInfos));
  }

  ngOnInit() {
  }

}
