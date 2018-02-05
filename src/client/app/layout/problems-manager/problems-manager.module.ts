import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsManagerRoutingModule } from './problems-manager-routing.module';
import { ProblemsManagerComponent } from './problems-manager.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    ProblemsManagerRoutingModule, PageHeaderModule
  ],
  declarations: [ProblemsManagerComponent]
})
export class ProblemsManagerModule { }
