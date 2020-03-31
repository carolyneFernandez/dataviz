import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { GraphicComponent } from './graphic/graphic.component';
import { ButtonCityComponent } from './button-city/button-city.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    ButtonCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
