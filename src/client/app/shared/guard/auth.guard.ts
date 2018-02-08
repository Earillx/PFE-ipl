import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserDTO} from '../../../../shared/UserDTO';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {filter} from 'rxjs/operators/filter';
import {HttpClient} from '@angular/common/http';
import {TokenProviderService} from '../services/token-provider.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private loading: boolean = false;

    private _user = new ReplaySubject<UserDTO>(1);

    private user$ = this._user.asObservable();

    set user(user: any) {
        if (user === null) {
            this._user.next(null);
        } else {
            this._user.next(user as UserDTO);
        }
    }

    private _isLoggedIn: boolean = false;

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get subscriber() {
        return this.user$;
    }

    constructor(private router: Router, private http: HttpClient, private tokens: TokenProviderService) {
        this.loading = true;
        this._user.next(null);
        this.user$
            .pipe(filter(_ => _ !== null))
            .subscribe(user => this._isLoggedIn = true);
        this.user$
            .pipe(filter(_ => _ === null))
            .subscribe(user => this._isLoggedIn = false);

        this.http.get<UserDTO>('/me')
            .subscribe((value: UserDTO) => {
                this._user.next(value);
                this.loading = false;
            }, (error: Response) => {
                this.loading = false;
                this.tokens.token = null;
                console.log('Error http: ', error);
                if (error.status === 404) {
                    console.log('La page de connection n\'existe pas');
                } else if (error.status === 401) {
                    console.log('User non connecté');
                } else {
                    console.log('Erreur de connection : code ' + error.status);
                }
            });
    }


    login(login: string, password: string): Observable<any> {
        const observable = this.http.post<any>('/me', {
            email: login,
            password: password
        });

        observable.subscribe((response: any) => {
            console.log('Login response : ' + response);
            console.log('New token received ' + response.token);
            this.user = response.user;
            this.tokens.token = response.token;
            this.router.navigate(['/dashboard']);
        }, (err) => {
            console.log('Login error : ', err);
        });

        return observable;
    }

    logout(): Observable<Response> {
        const observable = this.http.delete<Response>('/me');

        observable.subscribe(() => {
            this.tokens.token = null;
            this.user = null;
            this.router.navigate(['/login']);
        });

        return observable;
    }

    canActivate(): Observable<boolean> {
        return this.user$.map<UserDTO, boolean>((user) => {
            if (user === null) {
                this.router.navigate(["/login"]);
                return false;
            } else {
                return true;
            }
        });
    }
}
