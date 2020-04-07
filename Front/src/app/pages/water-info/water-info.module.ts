import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterInfoComponent } from './water-info.component';
import { WaterInfoRoutingModule } from './water-info-routing.module';

@NgModule({
  declarations: [WaterInfoComponent],
  imports: [
    CommonModule,
    WaterInfoRoutingModule
  ]
})
export class WaterModule { }
