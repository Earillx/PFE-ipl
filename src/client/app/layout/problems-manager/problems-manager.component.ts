import {Component, OnInit} from '@angular/core';
import {MachinesProviderService} from '../../shared/services/machines-provider.service';
import {Observable} from "rxjs/src/Observable";

@Component({
    selector: 'app-problems-manager',
    templateUrl: './problems-manager.component.html',
    styleUrls: ['./problems-manager.component.css']
})
export class ProblemsManagerComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
