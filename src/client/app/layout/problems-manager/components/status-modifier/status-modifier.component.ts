import {Component, Input, OnInit} from '@angular/core';
import {ProblemDTO, Status} from '../../../../../../shared/ProblemDTO';
import {ProblemsService} from '../../../../shared/services/problems.service';

@Component({
    selector: 'app-status-modifier',
    templateUrl: './status-modifier.component.html',
    styleUrls: ['./status-modifier.component.css']
})
export class StatusModifierComponent implements OnInit {
    private problem: ProblemDTO;
    @Input() canModify: boolean;

    public keys: any[];
    public values: any;


    constructor(private problemsService: ProblemsService) {
        this.keys = Object.keys(Status).filter(k => typeof Status[k as any] === 'number'); // ['A', 'B']
        this.values = this.keys.map(k => Status[k as any]); // [0, 1]
    }

    onSelect(status: string) {
        this.problem.status = Status[status];
        this.problemsService.updateProblem(this.problem);
    }

    ngOnInit() {
        this.getProblem();

    }

    getProblem(): void {
        this.problemsService.selectedProblem$
            .subscribe(problem => {
                console.log('la');
                this.problem = problem;
                console.log(this.problem.problem_photo);
            });
    }

}
