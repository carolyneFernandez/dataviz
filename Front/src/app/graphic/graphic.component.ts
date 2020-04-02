import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  public datos:any;//todo lo que nos responde persona
  public listaPer:Object[]; //el array de objetos

  lineChartData: ChartDataSets[] = [
    { data: [20, 25, 30, 25,35,21,20], label: 'Min' },
    { data: [85, 72, 78, 75,73, 77, 75], label: 'Max' },
    { data: [30, 30, 35, 25,30, 32, 75], label: 'Prevesion'},
  ];

  lineChartLabels: Label[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi','Samedi','Dimanche'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'yellow',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private url: WeatherService) { 

   url.peti().subscribe(donne =>{
      console.log(donne);
      console.log("s");

   });
 
   
     
  }

  ngOnInit() {
      this.url.peti().subscribe(data => {
        console.log(data);
        console.log("s");
    });
  }

}