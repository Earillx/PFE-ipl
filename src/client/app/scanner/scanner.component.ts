import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {Location} from '@angular/common';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
    animations: [routerTransition()]
})
export class ScannerComponent implements OnInit {
    constructor(public location:Location) {}

    ngOnInit() {

    }

    decodeQR(qr:string) {
        console.log(qr);
        window.location.replace(qr);

    }
}
