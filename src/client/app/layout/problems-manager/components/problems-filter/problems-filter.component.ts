import {
    ChangeDetectionStrategy, Component, ElementRef, Host, Input, OnChanges, OnInit, SimpleChanges,
    ViewChild
} from '@angular/core';
import {MachineDTO} from "../../../../../../shared/MachineDTO";
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ProblemsService} from "../../../../shared/services/problems.service";
import {ProblemDTO, Type, Status} from "../../../../../../shared/ProblemDTO";
import {UserDTO} from "../../../../../../shared/UserDTO";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-problems-filter',
    templateUrl: './problems-filter.component.html',
    styleUrls: ['./problems-filter.component.scss']
})
export class ProblemsFilterComponent implements OnInit, OnChanges {

    private problems: ProblemDTO[] = [];

    public textFilter: string = '';

    public startDate?: NgbDateStruct = null;

    public endDate?: NgbDateStruct = null;

    public selectedStatus: any[] = [];

    public selectedTypes: any[] = [];

    public selectedRoom?: string = "Toutes les salles";

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

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    clickState(selectElement) {
        this.selectedStatus[selectElement].status = !this.selectedStatus[selectElement].status;
        this.filter();
    }

    clickType(selectElement) {
        this.selectedTypes[selectElement].status = !this.selectedTypes[selectElement].status;
        this.filter();
    }

    setStartDate() {
        setTimeout(() => {
            this.filter();
        }, 100);
    }

    setEndDate() {
        setTimeout(() => {
            this.filter();
        }, 100);
    }


    resetEndDate() {
        this.endDate = null;
        this.filter();
    }

    resetStartDate() {
        this.startDate = null;
        this.filter();
    }

    updateRoom($event) {
        this.selectedRoom = $event.target.value;
        this.filter();
    }

    filter() {
        this.provider.setFilteredList(this.problems
            .filter((problem) => {
                return this.selectedRoom === "Toutes les salles" || (<MachineDTO>problem.machine).local === this.selectedRoom;
            })
            // .filter((problem) => {
            //     const date = new Date(problem.date);
            //     date.setHours(0,0,0, 0);
            //
            //     console.log("Item " + date);
            //
            //      if (this.startDate != null) {
            //          const startDate = new Date();
            //          startDate.setFullYear(this.startDate.year, this.startDate.month, this.startDate.day - 1);
            //          startDate.setHours(0, 0, 0,0);
            //
            //          console.log("Start " + startDate);
            //
            //          if (startDate.getTime() >= date.getTime()) {
            //              return false;
            //          }
            //      }
            //
            //      if (this.endDate != null) {
            //          const endDate = new Date();
            //          endDate.setFullYear(this.endDate.year, this.endDate.month, this.endDate.day - 1);
            //          endDate.setHours(0, 0, 0,0 );
            //
            //          console.log("End : " + endDate);
            //
            //          if (endDate.getTime() <= date.getTime()) {
            //              return false;
            //          }
            //      }
            //
            //      return true;
            // })
            .filter((problem) => {
                return this.selectedStatus[problem.status].status && this.selectedTypes[problem.type].status;
            }).filter((problem: ProblemDTO) => {
                return (<UserDTO>problem.user).email.toLowerCase().indexOf(this.textFilter) !== -1 || !this.textFilter ||
                    (<MachineDTO>problem.machine).local.toLowerCase().indexOf(this.textFilter) !== -1 ||
                    (<MachineDTO>problem.machine).name.toLowerCase().indexOf(this.textFilter) !== -1;
            }));
    }

}
