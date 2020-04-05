import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

<<<<<<< HEAD
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
registerLocaleData(localeFr, "fr-FR");

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
=======
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { ButtonCityComponent } from './button-city/button-city.component';
import { GraphicPieComponent } from './graphic-pie/graphic-pie.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
>>>>>>> update DAT-3
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
