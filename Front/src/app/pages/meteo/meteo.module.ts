import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeteoComponent } from './meteo.component';
//import { Routes, RouterModule } from '@angular/router';
import { MeteoRoutingModule } from './meteo-routing.module';
import { GraphicComponent } from 'src/app/graphic/graphic.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [MeteoComponent,GraphicComponent],
  imports: [
    CommonModule,
    ChartsModule,
    MeteoRoutingModule
    
  ]
})
export class MeteoModule { }
