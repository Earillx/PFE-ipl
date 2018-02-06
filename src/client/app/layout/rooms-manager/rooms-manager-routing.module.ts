import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsManagerComponent } from './rooms-manager.component';

const routes: Routes = [
    {
        path: '', component: RoomsManagerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomsManagerRoutingModule {
}