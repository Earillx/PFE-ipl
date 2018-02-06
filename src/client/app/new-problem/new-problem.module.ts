import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewProblemRoutingModule } from './new-problem-routing.module';
import {NewProblemComponent} from "./new-problem.component";

@NgModule({
  imports: [
    CommonModule,
    NewProblemRoutingModule
  ],
  declarations: [NewProblemComponent]
})
export class NewProblemModule { }
