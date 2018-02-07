import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthGuard} from "../../../shared/guard";
import {UserDTO} from "../../../../../shared/UserDTO";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';

    user?: UserDTO;

    constructor(public router: Router, private authGard: AuthGuard) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        authGard.subscriber.subscribe((user: UserDTO) => {
            this.user = user;
        });
    }

    ngOnInit() {
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        console.log(this.authGard.isLoggedIn);
        this.authGard.logout();
        console.log(this.authGard.isLoggedIn);
    }


}
