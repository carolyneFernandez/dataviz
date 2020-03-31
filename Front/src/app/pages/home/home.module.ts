import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ButtonCityComponent } from 'src/app/button-city/button-city.component';

@NgModule({
  declarations: [
    HomeComponent,
    ButtonCityComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }