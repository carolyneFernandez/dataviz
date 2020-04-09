import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { ButtonCityComponent } from "../../components/button-city/button-city.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { MapCityComponent } from "../../components/map-city/map-city.component";
import { UiSwitchModule } from "ngx-toggle-switch";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HomeComponent, ButtonCityComponent, MapCityComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ChartsModule,
    UiSwitchModule,
    NgxSpinnerModule
  ],
})
export class HomeModule {}
