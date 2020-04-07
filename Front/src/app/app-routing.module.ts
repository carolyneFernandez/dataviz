import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: "./pages/home/home.module#HomeModule" },
  { path:'meteo/:idcity', loadChildren: "./pages/meteo/meteo.module#MeteoModule" },
  { path:'water/:idcity', loadChildren: "./pages/water-info/water-info.module#WaterModule" },
  { path: 'bar-chart', component: GraphicComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
