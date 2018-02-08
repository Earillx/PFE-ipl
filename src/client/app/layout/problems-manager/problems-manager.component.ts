import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../router.animations";
import {ProblemsService} from "../../shared/services/problems.service";

@Component({
    selector: 'app-problems-manager',
    templateUrl: './problems-manager.component.html',
    styleUrls: ['./problems-manager.component.scss'],
    animations: [routerTransition()]
})
export class ProblemsManagerComponent implements OnInit {

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

    selectProblem(problem?: ProblemDTO): void {
        this.selectedProblem = problem;
    }

}
