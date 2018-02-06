import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';


@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css'],
    animations: [routerTransition()]

})
export class NewProblemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
