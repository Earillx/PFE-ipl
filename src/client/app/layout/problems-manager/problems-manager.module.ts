import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsManagerRoutingModule } from './problems-manager-routing.module';
import { ProblemsManagerComponent } from './problems-manager.component';

@NgModule({
  imports: [
    CommonModule,
    ProblemsManagerRoutingModule
  ],
  declarations: [ProblemsManagerComponent]
})
export class ProblemsManagerModule { }
