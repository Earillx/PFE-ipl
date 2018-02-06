import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'problems' },
            { path: 'problems', loadChildren: './problems-manager/problems-manager.module#ProblemsManagerModule' },
            { path: 'rooms', loadChildren: './rooms-manager/rooms-manager.module#RoomsManagerModule' },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
