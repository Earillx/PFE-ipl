import { Component, OnInit } from '@angular/core';
import {MockProblemsService} from "../../../../shared/services/mock/mock-problems.service";
@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
  problems :  [{ [key:string]:any; }];
    rows = <any>[];

    temp = <any>[];

    columns = [
        { prop: 'name' },
        { name: 'Company' },
        { name: 'Gender' }
    ];


  constructor(private problemsService:MockProblemsService) { }

  ngOnInit() {
    this.getProblems();
    console.log(this.problems[0].email);
  }

  getProblems():void{
      this.problemsService.getProblems()
          .subscribe(problems => this.problems = problems);
  }

}
