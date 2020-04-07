import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaterInfoComponent } from './water-info.component';

const routes: Routes = [
    { path: '', component:  WaterInfoComponent }
];

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WaterInfoRoutingModule { }