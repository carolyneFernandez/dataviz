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
    { data: [20, 25, 30, 25,35,21,20], label: 'Prevession' },
    { data: [12, 10, 12, 10,12,10,10], label: 'Normal' }
  ];

  chartLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi','Samedi','Dimanche'];

  onChartClick(event) {
    console.log(event);
  }
  constructor(private url:WeatherService) { 
    // console.log(url.get_articles())
  }

  ngOnInit() {
    
  }
 

}