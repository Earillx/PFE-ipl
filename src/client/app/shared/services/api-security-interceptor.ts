import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthGuard} from "../guard";
import {TokenProviderService} from "./token-provider.service";

@Injectable()
export class ApiSecurityInterceptor implements HttpInterceptor {

    constructor(private tokens: TokenProviderService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: "token " + (this.tokens.token !== null ? this.tokens.token : "")
            }
        });

        console.log("New request : ", request.headers);

        return next.handle(request);
    }
}
