import {Component, Input, OnInit} from '@angular/core';
import {MachineDTO} from "../../../../../../shared/MachineDTO";

@Component({
    selector: 'app-machine-tools',
    templateUrl: './machine-tools.component.html',
    styleUrls: ['./machine-tools.component.css']
})
export class MachineToolsComponent implements OnInit {


    @Input() machine: MachineDTO;

    constructor() {
    }

    ngOnInit() {
    }

}
