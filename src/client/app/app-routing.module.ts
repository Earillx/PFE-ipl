import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared';

const routes: Routes = [
    {path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]},
    {path: 'dashboard', redirectTo: '/problems/manager'},
    {path: 'scanner', loadChildren: './scanner/scanner.module#ScannerModule'},
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    {path: 'new-problem/:id', loadChildren: './new-problem/new-problem.module#NewProblemModule'},
    {path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule'},
    {path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule'},
    {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
