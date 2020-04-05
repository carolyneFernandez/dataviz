import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeteoComponent } from "./meteo.component";
//import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { MeteoRoutingModule } from "./meteo-routing.module";
import { CurrentWeatherComponent } from "../../current-weather/current-weather.component";
import { FollowingWeatherComponent } from "src/app/following-weather/following-weather.component";

@NgModule({
  declarations: [
    MeteoComponent,
    CurrentWeatherComponent,
    FollowingWeatherComponent,
  ],
  imports: [CommonModule, MeteoRoutingModule],
=======
import { MeteoRoutingModule } from './meteo-routing.module';
import { GraphicPieComponent } from 'src/app/graphic-pie/graphic-pie.component';

@NgModule({
  declarations: [MeteoComponent,GraphicPieComponent],
  imports: [
    CommonModule,
    MeteoRoutingModule
  ]
>>>>>>> update DAT-3
})
export class MeteoModule {}
