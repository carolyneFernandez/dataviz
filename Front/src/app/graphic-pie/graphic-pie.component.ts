import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-graphic-pie',
  templateUrl: './graphic-pie.component.html',
  styleUrls: ['./graphic-pie.component.scss']
})
export class GraphicPieComponent implements OnInit {

  datos=[24,50,10];

  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["taux humidité 24%", "couverture nuageuse 50%", "soleil 10%"],
          datasets: [{
              data: [this.datos[0],this.datos[1],this.datos[2]],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 0, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
      }
    });
  }


  PieChart=[];

  // pie chart:


  constructor() { }

  ngOnInit() {

    
  }

}