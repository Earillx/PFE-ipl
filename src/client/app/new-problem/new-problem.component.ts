import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {MachinesProviderService} from "../shared/services/machines-provider.service";
import {MachineDTO} from "../../../shared/MachineDTO";
import {Router} from '@angular/router';
import {UserDTO} from "../../../shared/UserDTO";
import {ProblemDTO} from "../../../shared/ProblemDTO";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {MockProblemsService} from "../shared/services/mock/mock-problems.service";


@Component({
    selector: 'app-new-problem',
    templateUrl: './new-problem.component.html',
    styleUrls: ['./new-problem.component.css'],
    animations: [routerTransition()]

})
export class NewProblemComponent implements OnInit {
    private machine: MachineDTO;
    private image: string;
    private description: string;
    problemForm: FormGroup;

    constructor(private machineService: MachinesProviderService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private problemService: MockProblemsService) {
        this.problemForm = this.formBuilder.group({
            email: [null, Validators.required],
            short_description: [null, Validators.required],
        });

    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params['id']); //log the value of id
            this.getMachine(Number(params['id']));

        });

    }

    getMachine(id: number): void {
        this.machineService.getMachine(id)
            .subscribe(machine => {
                this.machine = machine;
                console.log(machine);
                if (machine === undefined) this.router.navigate(['not-found']);
            });
    }

    private onChange(event) {

        // get value from text area
        this.description = event.target.value;
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var temp: any;
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            temp = myReader.result;
            this.image = temp;
        }
        myReader.readAsDataURL(file);
    }

    addProblem(form) {
        console.log(form);
        if (!this.description) return;
        if (!this.machine) return;
        if (!this.image) return;
        console.log("yutqsdbkq");// adduser var contains all our form values. store it where you want
        let user: UserDTO = {
            email: form.email
        };
        let machine: MachineDTO = {
            __id: this.machine.__id
        };
        let problem: ProblemDTO = {
            user: user,
            problem_description: this.description,
            short_description: form.short_description,
            base64: this.image

        };
        console.log(problem);// adduser var contains all our form values. store it where you want
        this.problemService.addProblem(problem).subscribe(()=> console.log("qsdnqknqksbdkqbdkijqnq"));

    }

}
