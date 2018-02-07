import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {UserDTO} from '../../../../shared/UserDTO';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {

    private _user = new ReplaySubject<UserDTO>(1);
    private user = this._user.asObservable();

    private _isLoggedIn: boolean = false;

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get subscriber() {
        return this.user;
    }

    constructor(private router: Router) {
        this._user.next(null);
        this.user
            .pipe(filter(_ => _ !== null))
            .subscribe(user => this._isLoggedIn = true);
        this.user
            .pipe(filter(_ => _ === null))
            .subscribe(user => this._isLoggedIn = false);
    }


    login(login: string, password: string) {
        this._user.next({ __id: '0', email: login, password: password, } as UserDTO);
    }

    logout() {
        console.log('Deconnection');
        this._user.next(null);
        this.router.navigate([ '/login' ]);
    }

    canActivate() {
        if (this.isLoggedIn) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
