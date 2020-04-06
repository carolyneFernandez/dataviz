import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ButtonCityComponent } from 'src/app/button-city/button-city.component';
import { ChartsModule } from 'ng2-charts';
import { GraphicComponent } from 'src/app/graphic/graphic.component';

@NgModule({
  declarations: [
    HomeComponent,
    ButtonCityComponent,
    GraphicComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }