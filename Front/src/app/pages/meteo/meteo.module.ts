import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeteoComponent } from "./meteo.component";
//import { Routes, RouterModule } from '@angular/router';
import { MeteoRoutingModule } from "./meteo-routing.module";
import { CurrentWeatherComponent } from "../../current-weather/current-weather.component";
import { FollowingWeatherComponent } from "src/app/following-weather/following-weather.component";
import { WindGraphComponent } from '../../wind-graph/wind-graph.component';
import { WaterInfoComponent } from "src/app/water-info/water-info.component";
import { GraphicPieComponent } from 'src/app/graphic-pie/graphic-pie.component';
import { GraphicComponent } from 'src/app/graphic/graphic.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MeteoComponent,
    CurrentWeatherComponent,
    FollowingWeatherComponent,
    WindGraphComponent,
    WaterInfoComponent,
    GraphicPieComponent,
    GraphicComponent
    ],
  imports: [CommonModule, MeteoRoutingModule,ChartsModule],
})
export class MeteoModule {}
