import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { PrevisionService } from '../../services/prevision.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic-pie',
  templateUrl: './graphic-pie.component.html',
  styleUrls: ['./graphic-pie.component.scss'],
})
export class GraphicPieComponent implements OnInit {
  PieChart = [];

  private rainModerate = 0;
  private cloudyPartly = 0;
  private cloudyPartly2 = 0;

  private cloudy = 0;

  private lightRain = 0;
  private covered = 0;
  private clearSky = 0;

  public dataGraphic = [];
  private city: string;

  canvas: any;
  ctx: any;

  constructor(
    private previsionService: PrevisionService,
    private route: ActivatedRoute
  ) {
    this.city = this.route.snapshot.paramMap.get('nameCity');
  }

  ngOnInit(): void {
    this.previsionService.getFollowingDays(this.city).subscribe((data) => {
      for (const i in data) {
        if ((data[i].weather = 'pluie modérée')) {
          this.rainModerate++;
        }
        if (data[i].weather === 'peu nuageux') {
          this.cloudyPartly++;
        }
        if (data[i].weather === 'partiellement nuageux') {
          this.cloudyPartly2++;
        }
        if (data[i].weather === 'nuageux') {
          this.cloudy++;
        }
        if (data[i].weather === 'légère pluie') {
          this.lightRain++;
        }
        if (data[i].weather === 'couvert') {
          this.covered++;
        }
        if (data[i].weather === 'ciel dégagé') {
          this.clearSky++;
        }
      }
      this.dataGraphic = [
        this.rainModerate,
        this.cloudyPartly,
        this.cloudyPartly2,
        this.cloudy,
        this.lightRain,
        this.covered,
        this.clearSky,
      ];

      // tslint:disable-next-line: no-unused-expression
      new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [
            'Pluie Modérée',
            'Peu Nuageux',
            'Partiellement Nuageux',
            'Nuageux',
            'Légère Pluie',
            'Couvert',
            'Ciel Dégagé',
          ],
          datasets: [
            {
              data: [
                this.dataGraphic[0],
                this.dataGraphic[1],
                this.dataGraphic[2],
                this.dataGraphic[3],
                this.dataGraphic[4],
                this.dataGraphic[5],
                this.dataGraphic[6],
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(219, 10, 91, 1)',
                'rgba(118, 93, 105, 1)',
                'rgba(224, 130, 131, 1)',
                'rgba(210, 82, 127, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
        },
      });
    });
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
  }
}
