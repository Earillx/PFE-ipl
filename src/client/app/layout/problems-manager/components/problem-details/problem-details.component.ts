import {Component, OnInit} from '@angular/core';
import {ProblemDTO} from "../../../../../../shared/ProblemDTO";
import {ProblemsService} from "../../../../shared/services/problems.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/Rx';
import {Location} from "@angular/common";

@Component({
    selector: 'app-problem-details',
    templateUrl: './problem-details.component.html',
    styleUrls: ['./problem-details.component.css']
})
export class ProblemDetailsComponent implements OnInit {

    private searchingId;

    private problem: ProblemDTO = null;

    constructor(private problemsService: ProblemsService, private activeRoute: ActivatedRoute, private location: Location) {}

    ngOnInit() {
        this.activeRoute.params.subscribe((params: Params) => {
            this.searchingId =  params['id'];
            this.problemsService.getProblem(this.searchingId).subscribe(_ => this.problem = _);
        });
    }

    backToList(): void {
        this.location.back();
    }

}
