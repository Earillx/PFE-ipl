import {Component, OnInit, ViewChild} from '@angular/core';
import {ProblemDTO, Status, Type} from '../../../../../../shared/ProblemDTO';
import {DatatableComponent} from '@swimlane/ngx-datatable/src/components/datatable.component';
import {UserDTO} from '../../../../../../shared/UserDTO';
import {MachineDTO} from '../../../../../../shared/MachineDTO';
import {ProblemsService} from '../../../../shared/services/problems.service';

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
    public keysType = Object.keys(Type).filter(k => typeof Type[k as any] === "number"); // ["A", "B"]
    public valuesType = this.keysType.map(k => Type[k as any]); // [0, 1]
    public keysStatus = Object.keys(Status).filter(k => typeof Status[k as any] === "number"); // ["A", "B"]
    public valuesStatus = this.keysStatus.map(k => Status[k as any]); // [0, 1]




    constructor(private problemsService: ProblemsService) {

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

    updateFilter(event: any) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function (d) {
            return (<UserDTO>d.user).email.toLowerCase().indexOf(val) !== -1 || !val ||
                (<MachineDTO>d.machine).local.toLowerCase().indexOf(val) !== -1 ||
                (<MachineDTO>d.machine).name.toLowerCase().indexOf(val) !== -1||
                (this.keysStatus[d.status]).toLowerCase().indexOf(val) !== -1 ||
                (this.keysType[d.type ]).toLowerCase().indexOf(val) !== -1 ;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }


}
