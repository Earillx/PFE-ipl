import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatusModifierComponent} from "./problems-manager/components/status-modifier/status-modifier.component";


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent ],
    providers: []
})
export class LayoutModule {
}
