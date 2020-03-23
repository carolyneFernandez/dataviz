import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [20, 25, 30, 25,35,21,20], label: 'Min' },
    { data: [12, 10, 12, 10,12,10,10], label: 'Normal' },
    { data: [40, 40, 40, 30,40,40,40], label: 'Maxim' }
  ];

  chartLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi','Samedi','Dimanche'];

  onChartClick(event) {
    console.log(event);
  }
  public datos:any;//todo lo que nos responde persona
  public listaPer:Object[]; //el array de objetos
  constructor(private url:WeatherService) { 
    
    url.peti().subscribe(daticos =>{
      console.log(daticos["results"]);
      this.datos=daticos;
      this.listaPer=this.datos.results;
   });
 
   console.log(this.datos);
     
  }

  ngOnInit() {
    
  }
 

}