import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {SERVER_URI} from "../../../shared/Constants";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
    animations: [routerTransition()]
})
export class ScannerComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {

    }

    callback(readCode: String) {
        let address = '..' + readCode.substring(SERVER_URI.length);
        console.log(address);
        this.router.navigateByUrl(address,{ replaceUrl: true });
        //this.router.navigate(['/new-problem', { id: 42 }]);
    }
}
