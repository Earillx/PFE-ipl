import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ProblemDTO} from '../../../../shared/ProblemDTO';
import {ProblemsService} from '../../shared/services/problems.service';

@Component({
    selector: 'app-problems-manager',
    templateUrl: './problems-manager.component.html',
    styleUrls: ['./problems-manager.component.css'],
    animations: [routerTransition()]
})
export class ProblemsManagerComponent implements OnInit {
    private problems: ProblemDTO[];

    constructor(private problemsService: ProblemsService) {
    }

    ngOnInit() {
        // Force reload
        this.problemsService.loadProblems();
        this.problemsService.getProblems()
            .subscribe((problems: ProblemDTO[]) => {
                this.problems = problems;
            });
    }


}
