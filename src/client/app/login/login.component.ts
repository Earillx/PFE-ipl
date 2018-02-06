import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthGuard} from "../shared/guard";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public username: string;

    public password: string;

    constructor(public router: Router, private authGuard: AuthGuard) {}

    ngOnInit() {
        if (this.authGuard.isLoggedIn) {
            this.router.navigate([ "/dashboard" ]);
        }
    }

    onLoggedin() {
       this.authGuard.login(this.username, this.password);
       this.password = "";
    }
}
