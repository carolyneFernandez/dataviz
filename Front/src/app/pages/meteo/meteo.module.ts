import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeteoComponent } from "./meteo.component";
import { MeteoRoutingModule } from "./meteo-routing.module";
import { CurrentWeatherComponent } from "../../current-weather/current-weather.component";
import { FollowingWeatherComponent } from "src/app/following-weather/following-weather.component";
import { WaterInfoComponent } from "src/app/water-info/water-info.component";
import { GraphicPieComponent } from "src/app/graphic-pie/graphic-pie.component";
import { GraphicComponent } from "src/app/graphic/graphic.component";
import { ChartsModule } from "ng2-charts";
import { GraphicLineMultiComponent } from "src/app/graphic-line-multi/graphic-line-multi.component";
import { WindGraphComponent } from "src/app/wind-graph/wind-graph.component";
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    MeteoComponent,
    CurrentWeatherComponent,
    FollowingWeatherComponent,
    WindGraphComponent,
    WaterInfoComponent,
    GraphicPieComponent,
    GraphicComponent,
    GraphicLineMultiComponent,
  ],
  imports: [
    CommonModule,
    MeteoRoutingModule,
    ChartsModule,
    NgxLoadingModule.forRoot({}),
  ],
})
export class MeteoModule {}
