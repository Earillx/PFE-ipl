import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';


import {ProblemsManagerRoutingModule} from './problems-manager-routing.module';
import {ProblemsManagerComponent} from './problems-manager.component';
import {PageHeaderModule} from '../../shared';
import {ProblemsComponent} from './components/problems/problems.component';
import {ProblemDetailsComponent} from './components/problem-details/problem-details.component';
import { StatusModifierComponent } from './components/status-modifier/status-modifier.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
    imports: [
        CommonModule,
        ProblemsManagerRoutingModule,
        PageHeaderModule,
        NgxDatatableModule,

    ],
    declarations: [ProblemsManagerComponent, ProblemsComponent, ProblemDetailsComponent, StatusModifierComponent, StatsComponent]
})
export class ProblemsManagerModule {
}
