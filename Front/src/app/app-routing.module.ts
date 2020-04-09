import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./pages/home/home.module#HomeModule" },
  {
    path: "meteo/:idcity",
    loadChildren: "./pages/meteo/meteo.module#MeteoModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
