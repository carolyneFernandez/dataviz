import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WeatherService } from '../services/weather.service';
import { PrevisionService } from '../services/prevision.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

//  protected datos:any;//todo lo que nos responde persona
  public dataVille:Object[]; //el array de objetos


// constructor(private url: WeatherService) { 

  onChartClick(event) {
    //console.log(event);
  }
  constructor(private url:PrevisionService) { 
   // console.log(url.get_articles())
  }

  ngOnInit() {
   
   /* this.url.searchWeatherInfo("Paris").subscribe(data =>{
      this.AssignData(data["Temperature"]);
    });*/

  }

  AssignData(data:Object[]){
    this.dataVille=data;
  }

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



}