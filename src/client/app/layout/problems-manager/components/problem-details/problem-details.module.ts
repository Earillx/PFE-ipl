import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDetailsRoutingModule } from './problem-details-routing.module';
import {ProblemDetailsComponent} from "./problem-details.component";

@NgModule({
  imports: [
    CommonModule,
    ProblemDetailsRoutingModule
  ],
  declarations: [ ProblemDetailsComponent ]
})
export class ProblemDetailsModule { }
