import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MockProblemsService} from "../../../../shared/services/mock/mock-problems.service";
import {ProblemDTO} from "../../../../../../shared/ProblemDTO";
import { DatatableComponent } from "@swimlane/ngx-datatable/src/components/datatable.component";

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {
    @ViewChild('editTmpl') editTmpl: TemplateRef<ProblemDTO>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<ProblemDTO>;

    problems :  ProblemDTO[];
    rows :ProblemDTO[];
    temp :ProblemDTO [];



    @ViewChild(DatatableComponent) table: DatatableComponent;


  constructor(private problemsService:MockProblemsService) { }

  ngOnInit() {
    this.getProblems();
    this.rows = this.problems;
    console.log(this.problems[0].user.email);

  }

  getProblems():void{
      this.problemsService.getProblems()
          .subscribe(problems => this.problems = problems);
      this.temp=[...this.problems];
  }
    updateFilter(event:any) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.user.email.toLowerCase().indexOf(val) !== -1 || !val || d.snapshot_machine.local.toLowerCase().indexOf(val) !== -1|| d.snapshot_machine.name.toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }


}
