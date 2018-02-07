import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewProblemComponent} from "./new-problem.component";

const routes: Routes = [
    {
        path: '',
        component: NewProblemComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewProblemRoutingModule {
}
