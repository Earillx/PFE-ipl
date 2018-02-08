import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProblemsManagerComponent} from "./problems-manager.component";

const routes: Routes = [{
    path: '',
    component: ProblemsManagerComponent,
    children: [
        { path: '', redirectTo: 'manager' },
        { path: 'manager', loadChildren: './components/problems/problems.module#ProblemsModule' },
        { path: 'statistics', loadChildren: './components/statistics/statistics.module#StatisticsModule' },
        { path: 'detail/:id', loadChildren: './components/problem-details/problem-details.module#ProblemDetailsModule' }
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProblemsManagerRoutingModule {}
