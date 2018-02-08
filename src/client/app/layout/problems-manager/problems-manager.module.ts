import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';


import {ProblemsManagerRoutingModule} from './problems-manager-routing.module';
import {ProblemsManagerComponent} from './problems-manager.component';
import {PageHeaderModule} from '../../shared';
import { ProblemsFilterComponent } from './components/problems-filter/problems-filter.component';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StatusModifierComponent} from "./components/status-modifier/status-modifier.component";

@NgModule({
    imports: [
        CommonModule,
        ProblemsManagerRoutingModule,
        PageHeaderModule,
        NgxDatatableModule,
        FormsModule,
        NgbModule.forRoot(),
        NgbDatepickerModule
    ],
    declarations: [StatusModifierComponent, ProblemsManagerComponent, ProblemsFilterComponent],
    providers: []
})
export class ProblemsManagerModule {
}
