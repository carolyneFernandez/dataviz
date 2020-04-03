import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeteoComponent } from './meteo.component';
//import { Routes, RouterModule } from '@angular/router';
import { MeteoRoutingModule } from './meteo-routing.module';
import { CurrentWeatherComponent } from '../../current-weather/current-weather.component';

@NgModule({
  declarations: [
    MeteoComponent,
    CurrentWeatherComponent
  ],
  imports: [
    CommonModule,
    MeteoRoutingModule
  ]
})
export class MeteoModule { }
