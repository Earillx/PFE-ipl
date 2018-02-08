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
    public status: number;


    constructor(private problemsService: ProblemsService) {
        this.keys = Object.keys(Status).filter(k => typeof Status[k as any] === 'number'); // ['A', 'B']
        this.values = this.keys.map(k => Status[k as any]); // [0, 1]
    }

    onSelect(status: string) {
        this.problem.status = Status[status];
        console.log(this.problem);
        this.problemsService.updateProblem(this.problem);
        // this.problemService.getProblems().subscribe(() => console.log('GET probleme ok'));
    }

    ngOnInit() {
        this.status = 0;
        console.log(this.keys);
        this.getProblem();

    }

    getProblem(): void {
        this.problemsService.selectedProblem$
            .subscribe(problem => {
                this.problem = problem;
                console.log(this.problem.problem_photo);
            });
    }

}
