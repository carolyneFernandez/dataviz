import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { ButtonCityComponent } from "src/app/button-city/button-city.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { MapCityComponent } from "../../map-city/map-city.component";

@NgModule({
  declarations: [HomeComponent, ButtonCityComponent, MapCityComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ChartsModule,
  ],
})
export class HomeModule {}
