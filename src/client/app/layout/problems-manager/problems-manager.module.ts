import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ProblemsManagerRoutingModule } from './problems-manager-routing.module';
import { ProblemsManagerComponent } from './problems-manager.component';
import { PageHeaderModule } from '../../shared';
import { ProblemsComponent } from './components/problems/problems.component';
import { ProblemDetailsComponent } from './components/problem-details/problem-details.component';

@NgModule({
    imports: [
        CommonModule,
        ProblemsManagerRoutingModule,
        PageHeaderModule,
        NgxDatatableModule
    ],
    declarations: [ProblemsManagerComponent, ProblemsComponent, ProblemDetailsComponent]
})
export class ProblemsManagerModule { }
