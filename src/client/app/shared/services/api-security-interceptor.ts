import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../app.settings';
import {TokenProviderService} from "./token-provider.service";

@Injectable()
export class ApiSecurityInterceptor implements HttpInterceptor {

    constructor(private tokens: TokenProviderService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            url: AppSettings.API_ADDRESS + request.url,
            setHeaders: {
                Authorization: "token " + (this.tokens.token !== null ? this.tokens.token : "")
            }
        });

        return next.handle(request);
    }
}
