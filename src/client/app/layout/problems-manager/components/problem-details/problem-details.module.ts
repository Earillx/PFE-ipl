import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDetailsRoutingModule } from './problem-details-routing.module';
import {ProblemDetailsComponent} from "./problem-details.component";
import {StatusModifierComponent} from "./status-modifier/status-modifier.component";

@NgModule({
  imports: [
    CommonModule,
    ProblemDetailsRoutingModule
  ],
  declarations: [ ProblemDetailsComponent, StatusModifierComponent ]
})
export class ProblemDetailsModule { }
