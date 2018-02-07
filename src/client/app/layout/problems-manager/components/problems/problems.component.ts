import {Component, OnInit, ViewChild} from '@angular/core';
import {ProblemDTO} from "../../../../../../shared/ProblemDTO";
import {DatatableComponent} from "@swimlane/ngx-datatable/src/components/datatable.component";
import {UserDTO} from "../../../../../../shared/UserDTO";
import {MachineDTO} from "../../../../../../shared/MachineDTO";
import {ProblemsService} from "../../../../shared/services/problems.service";
import {MockProblemsService} from "../../../../shared/services/mock/mock-problems.service";

@Component({
    selector: 'app-problems',
    templateUrl: './problems.component.html',
    styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

    rows: ProblemDTO[] = [];
    temp: ProblemDTO [] = [];
    selected: ProblemDTO[] = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;


    constructor(private problemsService: MockProblemsService) {

    }


    ngOnInit() {
        this.getProblems();
    }

    onSelect({selected}: { selected: ProblemDTO }) {
        // console.log('Selected problem : ', this.selected[0].user.email);
        this.problemsService.selectedProblem = this.selected[this.selected.length - 1];
    }

    getProblems(): void {
        this.problemsService.getProblems()
            .subscribe(problems => {
                this.rows = problems;
                this.temp = [...problems];
            });


    }

    updateFilter(event: any) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function (d) {
            return (<UserDTO>d.user).email.toLowerCase().indexOf(val) !== -1 || !val ||
                (<MachineDTO>d.machine).local.toLowerCase().indexOf(val) !== -1 ||
                (<MachineDTO>d.machine).name.toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }


}
