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

    rows :ProblemDTO[]=new Array<ProblemDTO>();
    temp :ProblemDTO []=new Array<ProblemDTO>();
    selected :ProblemDTO[]=new Array<ProblemDTO>();
    @ViewChild(DatatableComponent) table: DatatableComponent;


  constructor(private problemsService:MockProblemsService) {

  }


  ngOnInit() {
    this.getProblems();
    console.log(this.rows[0].user_id.email);

  }

    onSelect({selected} : {selected:ProblemDTO}) {
        console.log('Selected problem : ',this.selected[0].user_id.email);
        this.problemsService.selectedProblem=this.selected[this.selected.length-1];
    }
  getProblems():void{
      this.problemsService.getProblems()
          .subscribe(problems =>{
              this.rows = problems;
              this.temp=[...problems];
          } );


  }
    updateFilter(event:any) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.user_id.email.toLowerCase().indexOf(val) !== -1 || !val || d.machine_id.local.toLowerCase().indexOf(val) !== -1|| d.machine_id.name.toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }




}
