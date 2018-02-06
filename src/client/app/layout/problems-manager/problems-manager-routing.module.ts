import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProblemsManagerComponent} from "./problems-manager.component";

const routes: Routes = [ {
    path: '', component: ProblemsManagerComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemsManagerRoutingModule { }
