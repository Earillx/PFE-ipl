import {
    ChangeDetectionStrategy, Component, ElementRef, Host, Input, OnChanges, OnInit, SimpleChanges,
    ViewChild
} from '@angular/core';
import {MachineDTO} from "../../../../../../shared/MachineDTO";
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ProblemsService} from "../../../../shared/services/problems.service";
import {ProblemDTO, Type, Status} from "../../../../../../shared/ProblemDTO";
import {UserDTO} from "../../../../../../shared/UserDTO";


@Component({
    selector: 'app-problems-filter',
    templateUrl: './problems-filter.component.html',
    styleUrls: ['./problems-filter.component.scss']
})
export class ProblemsFilterComponent implements OnInit {

    private problems: ProblemDTO[] = [];

    public textFilter: string = '';

    public startDate: any = {};

    public endDate: any = {};

    public selectedStatus: any[] = [];

    public selectedTypes: any[] = [];

    public selectedRoom?: string;

    public get rooms() {
        return this.problems.map(_ => (<MachineDTO>_.machine).local).filter((value, index, array) => {
            return array.indexOf(value) === index;
        });
    }

    constructor(private provider: ProblemsService) {
        this.selectedTypes = Object.keys(Type).filter(k => typeof Type[k as any] === "number")
            .map((val, index) => { return { val : val, status: true, index: index }; });
        this.selectedStatus = Object.keys(Status).filter(k => typeof Status[k as any] === "number")
            .map((val, index) => { return { val : val, status: true, index: index }; });
    }

    ngOnInit() {
        this.provider.getProblems().subscribe((problems) => {
            this.problems = problems;
            this.filter();
        });
    }


    clickState(selectElement) {
        this.selectedStatus[selectElement].status = !this.selectedStatus[selectElement].status;
        this.filter();
    }

    clickType(selectElement) {
        this.selectedTypes[selectElement].status = !this.selectedTypes[selectElement].status;
        this.filter();
    }

    resetEndDate() {
        this.endDate = {};
        this.filter();
    }

    resetStartDate() {
        this.startDate = {};
        this.filter();
    }

    filter() {
        this.provider.setFilteredList(this.problems
            .filter((problem: ProblemDTO) => {
                return (<UserDTO>problem.user).email.toLowerCase().indexOf(this.textFilter) !== -1 || !this.textFilter ||
                    (<MachineDTO>problem.machine).local.toLowerCase().indexOf(this.textFilter) !== -1 ||
                    (<MachineDTO>problem.machine).name.toLowerCase().indexOf(this.textFilter) !== -1;
            }).filter((problem) => {
                const date = new Date(problem.date);
                date.setHours(0,0,0, 0);
                console.log(date);

                 if (this.startDate.length !== 0) {
                     const startDate = new Date();
                     startDate.setUTCFullYear(this.startDate.year, this.startDate.month, this.startDate.day);
                     startDate.setUTCHours(0, 0, 0,0 );

                     console.log(startDate);

                     if (startDate.getTime() > date.getTime()) {
                         return false;
                     }
                 }

                 if (this.endDate.length !== 0) {
                     const endDate = new Date();
                     endDate.setUTCFullYear(this.endDate.year, this.endDate.month, this.endDate.day);
                     endDate.setUTCHours(0, 0, 0,0 );

                     console.log(this.endDate);
                     console.log(endDate);

                     if (endDate.getTime() > date.getTime()) {
                         return false;
                     }
                 }

                 return true;
            }).filter((problem) => {
                return this.selectedStatus[problem.status].status && this.selectedTypes[problem.type].status;
            }));
    }

}
