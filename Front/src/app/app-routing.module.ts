import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicComponent } from './graphic/graphic.component';


const routes: Routes = [
  { path: '', loadChildren: "./pages/home/home.module#HomeModule" },
  { path:'meteo/:idcity', loadChildren: "./pages/meteo/meteo.module#MeteoModule" },
  {path: 'bar-chart', component: GraphicComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
