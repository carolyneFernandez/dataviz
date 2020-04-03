import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeteoComponent } from "./meteo.component";
//import { Routes, RouterModule } from '@angular/router';
import { MeteoRoutingModule } from "./meteo-routing.module";
import { CurrentWeatherComponent } from "../../current-weather/current-weather.component";
import { FollowingWeatherComponent } from "src/app/following-weather/following-weather.component";
import { WindGraphComponent } from '../../wind-graph/wind-graph.component';

@NgModule({
  declarations: [
    MeteoComponent,
    CurrentWeatherComponent,
    FollowingWeatherComponent,
    WindGraphComponent
  ],
  imports: [CommonModule, MeteoRoutingModule],
})
export class MeteoModule {}
