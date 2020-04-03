import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeteoComponent } from './meteo.component';
//import { Routes, RouterModule } from '@angular/router';
import { MeteoRoutingModule } from './meteo-routing.module';
import { WindGraphComponent } from '../../wind-graph/wind-graph.component';

@NgModule({
  declarations: [MeteoComponent, WindGraphComponent],
  imports: [
    CommonModule,
    MeteoRoutingModule
    
  ]
})
export class MeteoModule { }
