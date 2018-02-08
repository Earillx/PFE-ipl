import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    TranslateModule
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule { }
