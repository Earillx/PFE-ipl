import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import 'rxjs/Rx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {MachinesProviderService} from './shared/services/machines-provider.service';
import {MockProblemsService} from './shared/services/mock/mock-problems.service';
import {ApiSecurityInterceptor} from './shared/services/api-security-interceptor';
import {TokenProviderService} from './shared/services/token-provider.service';
import {ProblemsService} from './shared/services/problems.service';
import {UsersService} from './shared/services/users.service';
import {Ng2FileSizeModule} from "ng2-file-size";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [TokenProviderService, AuthGuard, MachinesProviderService, MockProblemsService, ProblemsService, UsersService, {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiSecurityInterceptor,
        multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
