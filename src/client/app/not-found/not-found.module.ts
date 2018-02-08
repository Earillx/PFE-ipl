import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotFoundRoutingModule} from './not-found-routing.module';
import {NotFoundComponent} from './not-found.component';
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        RouterModule,
        TranslateModule.forRoot()
    ],
    declarations: [NotFoundComponent]
})
export class NotFoundModule {
}
