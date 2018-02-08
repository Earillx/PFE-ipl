import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProblemDetailsComponent} from "./problem-details.component";

const routes: Routes = [
    { path: '', component: ProblemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemDetailsRoutingModule { }
