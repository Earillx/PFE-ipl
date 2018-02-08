import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDetailsRoutingModule } from './problem-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProblemDetailsRoutingModule
  ],
  declarations: [ ProblemDetailsModule ]
})
export class ProblemDetailsModule { }
