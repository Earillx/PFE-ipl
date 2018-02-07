import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';


@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.component.html',
    styleUrls: ['./scanner.component.css'],
    animations: [routerTransition()]
})
export class ScannerComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {

    }

    decodeQR(qr: string) {
        console.log(qr);
        window.location.replace(qr);

    }
}
