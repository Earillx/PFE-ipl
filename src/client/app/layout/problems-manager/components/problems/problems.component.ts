import {Component, Host, Input, OnInit, ViewChild} from '@angular/core';
import {ProblemDTO, Status, Type} from '../../../../../../shared/ProblemDTO';
import {DatatableComponent} from '@swimlane/ngx-datatable/src/components/datatable.component';
import {ProblemsService} from '../../../../shared/services/problems.service';
import {Observable} from 'rxjs/Observable';
import {ProblemsManagerComponent} from "../../problems-manager.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-problems',
    templateUrl: './problems.component.html',
    styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;

    list: ProblemDTO[];

    rows: ProblemDTO[] = [];
    temp: ProblemDTO [] = [];
    selected: ProblemDTO[] = [];


    public readonly keysType = Object.keys(Type).filter(k => typeof Type[k as any] === "number"); // ["A", "B"]
    public readonly valuesType = this.keysType.map(k => Type[k as any]); // [0, 1]
    public readonly keysStatus = Object.keys(Status).filter(k => typeof Status[k as any] === "number"); // ["A", "B"]
    public readonly valuesStatus = this.keysStatus.map(k => Status[k as any]); // [0, 1]

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private router: Router, private problemsService: ProblemsService) {
        problemsService.getFilteredList().subscribe((problems: ProblemDTO[]) => {
            this.list = problems;
            if (this.table) {
                this.table.offset = 0;
            }
            this.rows = problems;
            this.temp = [...problems];
        });
    }


    ngOnInit() {
        this.getProblems();
    }

    onSelect({selected}: { selected: ProblemDTO }) {
        console.log(this.selected);
        this.problemsService.selectedProblem = this.selected[this.selected.length - 1];
    }

    getProblems(): void {
        this.problemsService.getProblems()
            .subscribe(problems => {
                this.rows = problems;
                this.temp = [...problems];
            });


    }

    ngOnInit() {};

    onSelect({selected}: { selected: ProblemDTO }) {
        // console.log('Selected problem : ', this.selected[0].user.email);
        // this.problemsService.selectedProblem = this.selected[this.selected.length - 1];
        this.router.navigate([ "/problems/detail/" + this.selected[this.selected.length - 1].__id]);
    }

}
