import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProblemsComponent} from "./problems.component";

const routes: Routes = [
    { path: '', component: ProblemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemsRoutingModule { }
