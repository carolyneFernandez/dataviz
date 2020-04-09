import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrevisionService } from 'src/app/services/prevision.service';

@Component({
  selector: 'water-info',
  templateUrl: './water-info.component.html',
  styleUrls: ['./water-info.component.scss'],
})
export class WaterInfoComponent implements OnInit {
  public cityWatersList: any;
  public cityName: string;
  public currentStation: string;
  public stationInfos: any;

  constructor(
    private route: ActivatedRoute,
    private previsionService: PrevisionService
  ) {
    this.cityName = this.route.snapshot.paramMap.get('nameCity');
    this.previsionService.getWatersList(this.cityName).then((data) => {
      this.cityWatersList = data;
    });
  }

  initChart(codeStation: string, wording: string) {
    this.stationInfos = null;
    this.currentStation = wording;
    this.previsionService
      .getWaterInfos(this.cityName, codeStation)
      .then((result) => {
        if (result.length === 0) {
          this.stationInfos = 'Cette station ne possède pas de données.';
        } else {
          this.stationInfos = result[result.length - 1];
        }
      });
  }

  ngOnInit() {}
}
