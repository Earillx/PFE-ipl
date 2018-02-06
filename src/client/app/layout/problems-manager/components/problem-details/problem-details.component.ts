import {Component, Input, OnInit} from '@angular/core';
import {ProblemDTO} from "../../../../../../shared/ProblemDTO";
import {MockProblemsService} from "../../../../shared/services/mock/mock-problems.service";
import {AppSettings} from "../../../../../app.settings";

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.css']
})
export class ProblemDetailsComponent implements OnInit {
  private problem:ProblemDTO;
  constructor(private problemsService:MockProblemsService) { }


  ngOnInit() {
    this.getProblem();
  }

    getProblem():void{
        this.problemsService.selectedProblem$
            .subscribe(problem => {
              this.problem = problem;
              console.log(this.problem.problem_photo);
            });
    }

}
