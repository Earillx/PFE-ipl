import {Component, Input, OnInit} from '@angular/core';
import {ProblemDTO} from '../../../../../../shared/ProblemDTO';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    @Input() problems: ProblemDTO[];

    constructor() {

    }

    ngOnInit() {
    }
}
