import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {UserDTO} from '../../../../shared/UserDTO';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SecurityContextDTO} from '../../../../shared/SecurityContextDTO';

@Injectable()
export class AuthGuard implements CanActivate {

    private readonly api: string = "http://localhost:8888/api";

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

    constructor(private router: Router, private http: HttpClient) {
        this._user.next(null);
        this.user$
            .pipe(filter(_ => _ !== null))
            .subscribe(user => this._isLoggedIn = true);
        this.user$
            .pipe(filter(_ => _ === null))
            .subscribe(user => this._isLoggedIn = false);

        this.http.get<SecurityContextDTO>(this.api + '/me')
            .subscribe((value: SecurityContextDTO) => {
                if (value.groupName === 'admin') {
                    this._user.next({id: '1', email: 'aze', password: null} as UserDTO);
                } else {
                    this._user.next(null);
                }
            }, (error: Response) => {
                console.log(error);
                if (error.status === 404) {
                    console.log('La page de connection n\'existe pas');
                } else if (error.status === 401) {
                    console.log('User non connecté');
                } else {
                    console.log('Erreur de connection : code ' + error.status);
                }
            });
    }


    login(login: string, password: string): Observable<SecurityContextDTO> {
        const observable = this.http.post<SecurityContextDTO>(this.api + "/me", {
            email: login,
            password: password
        });

        observable.subscribe((response: SecurityContextDTO) => {
            this.user = {id: '1', email: login, password: null};
            this.router.navigate(['/dashboard']);
        }, () => {});

        return observable;
    }

    logout(): Observable<Response> {
        const observable = this.http.delete<Response>(this.api + "/me");

        observable.subscribe(() => {
            this.user = null;
            this.router.navigate(['/login']);
        });

        return observable;
    }

    canActivate() {
        if (this.isLoggedIn) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
