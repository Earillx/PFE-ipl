import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthGuard} from '../shared/guard';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    public loading?: boolean = false;

    public error?: string = null;

    public username: string;

    public password: string;

    constructor(
        public router: Router,
        private authGuard: AuthGuard,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = formBuilder.group( {
            username: [ null, Validators.required ],
            password: [ null, Validators.required ]
        });
    }

    ngOnInit() {
        this.loading = false;
        this.error = null;

        if (this.authGuard.isLoggedIn) {
            this.router.navigate([ '/dashboard' ]);
        }
    }

    resetError() {
        this.error = null;
    }

    onLoggedin() {
        console.log("Logging in");
        if (this.loading) {
            return;
        }

        this.error = null;
        this.loading = true;
        this.authGuard.login(this.username, this.password)
           .subscribe(() => {
               this.loading = false;
            }, (error: Response) => {
               this.loading = false;
               switch (error.status) {
                   case 404:
                       this.error = "Vérifiez vos credentials";
                       break;
                   case 500:
                       this.error = "Une erreur interne est survenue";
                       break;
                   default:
                       this.error = "Une erreur non reconnue est survenue";
                       break;
               }
           });
        this.password = '';
    }
}
