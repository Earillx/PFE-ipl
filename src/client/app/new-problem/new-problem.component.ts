import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {MachinesProviderService} from "../shared/services/machines-provider.service";
import {MachineDTO} from "../../../shared/MachineDTO";
import {ActivatedRoute, Router} from '@angular/router';
import {UserDTO} from "../../../shared/UserDTO";
import {ProblemDTO} from "../../../shared/ProblemDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProblemsService} from "../shared/services/problems.service";
import {UsersService} from "../shared/services/users.service";


@Component({
    selector: 'app-new-problem',
    templateUrl: './new-problem.component.html',
    styleUrls: ['./new-problem.component.css'],
    animations: [routerTransition()]

})
export class NewProblemComponent implements OnInit {
    problemForm: FormGroup;
    private machine: MachineDTO;
    private image: string;
    private description: string;

    constructor(private machineService: MachinesProviderService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private problemService: ProblemsService,
                private userService: UsersService) {
        this.problemForm = this.formBuilder.group({
            email: [null, Validators.required],
            short_description: [null, Validators.required],
        });

    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params['id']); //log the value of id
            this.getMachine(params['id'].toString());
        });

    }

    getMachine(id: string): void {
        this.machineService.getMachine(id)
            .subscribe(machine => {
                this.machine = machine;
                console.log(machine);
                if (machine === undefined) this.router.navigate(['not-found']);
            });
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

    addProblem(form: any) {
        if (!this.description) return;
        if (!this.machine) return;
        let user: UserDTO = {
            email: form.email
        };
        let machine: MachineDTO = {
            __id: this.machine.__id
        };
        let userD: UserDTO = {email: form.email};
        this.userService.addUser(userD).subscribe((u:UserDTO) => {
            console.log(u);
            let problem: ProblemDTO = {
                user: u.__id,
                problem_description: this.description,
                short_description: form.short_description,
                base64: this.image

            };
            this.problemService.addProblem(problem).subscribe(() => console.log('Formulaire bien envoyé'));

        });
    }

    private onChange(event) {

        // get value from text area
        this.description = event.target.value;
    }

}
