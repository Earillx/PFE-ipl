import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsRoutingModule } from './problems-routing.module';
import {ProblemsComponent} from "./problems.component";
import {TranslateModule} from "@ngx-translate/core";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    CommonModule,
      TranslateModule,
    ProblemsRoutingModule,
      NgxDatatableModule
  ],
  declarations: [ ProblemsComponent ]
})
export class ProblemsModule { }
