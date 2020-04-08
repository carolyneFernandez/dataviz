import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as Chart from 'chart.js'
import { PrevisionService } from '../services/prevision.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic-pie',
  templateUrl: './graphic-pie.component.html',
  styleUrls: ['./graphic-pie.component.scss']
})
export class GraphicPieComponent implements OnInit {
  PieChart=[];

  private rainModerate  =0;
  private cloudyPartly=0;
  private cloudyPartly2=0;

  private cloudy=0;

  private lightRain=0;
  private covered=0;
  private clearSky=0;

  public datos;
  private city;
  constructor(private previsionService: PrevisionService,private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get("idcity");

   }

  ngOnInit(): void {

   this.previsionService
   .getFollowingDays(this.city)
   .subscribe(data => {
        for(let i in data){
         
          if(data[i].weather== "pluie modérée"){
            this.rainModerate++;
          }
          if(data[i].weather== "peu nuageux"){
            this.cloudyPartly++;

          }
          if(data[i].weather== "partiellement nuageux"){
            this.cloudyPartly2++;

          }
          if(data[i].weather== "nuageux"){
            this.cloudy++;

          }
          if(data[i].weather== "légère pluie"){
            this.lightRain++;

          }	
          if(data[i].weather== "couvert"){
            this.covered++;

          }
          if(data[i].weather== "ciel dégagé"){
            this.clearSky++;

          }
        }
        this.datos=[this.rainModerate,this.cloudyPartly,this.cloudyPartly2,this.cloudy,this.lightRain,this.covered,this.clearSky];
        
        let myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
              labels: ["pluie modérée", "peu nuageux", "partiellement nuageux","nuageux", "légère pluie", "couvert","ciel dégagé"],
              datasets: [{
                  data: [this.datos[0],this.datos[1],this.datos[2],this.datos[3],this.datos[4],this.datos[5],this.datos[6]],
                  backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(219, 10, 91, 1)',
                      'rgba(118, 93, 105, 1)',
                      'rgba(224, 130, 131, 1)',
                      'rgba(210, 82, 127, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            responsive: false,
          }
        });
      });
    
    
  }



  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
   
  }


 


}