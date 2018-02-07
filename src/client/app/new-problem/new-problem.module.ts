import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import {NewProblemRoutingModule} from './new-problem-routing.module';
import {NewProblemComponent} from "./new-problem.component";

@NgModule({
    imports: [
        CommonModule,
        NewProblemRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [NewProblemComponent]
})
export class NewProblemModule {
}
