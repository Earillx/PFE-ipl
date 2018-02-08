import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {MachinesProviderService} from '../shared/services/machines-provider.service';
import {MachineDTO} from '../../../shared/MachineDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDTO} from '../../../shared/UserDTO';
import {ProblemDTO} from '../../../shared/ProblemDTO';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProblemsService} from '../shared/services/problems.service';
import {UsersService} from '../shared/services/users.service';


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
            console.log(params['id']); // log the value of id
            this.getMachine(params['id'].toString());
        });

    }

    getMachine(id: string): void {
        this.machineService.loadMachine(id)
            .subscribe(machine => {
                this.machine = machine;
                console.log(machine);
                if (machine === undefined) {
                    this.router.navigate(['not-found']);
                }
            });
    }

    changeListener($event: any): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        let temp: any;
        let file: File = inputValue.files[0];
        let myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            temp = myReader.result;
            this.image = temp;
        };
        myReader.readAsDataURL(file);
    }

    addProblem(form: any) {
        if (!this.description) return;
        if (!this.machine) return;
        let user: UserDTO = {
            email: form.email
        };
        if(this.image){
            if(this.image.length>13333333){
                // image plus grande que 10 MB
                return;
            }
        }
        let userD: UserDTO = {email: form.email};
        this.userService.addUser(userD).subscribe((u: UserDTO) => {
            console.log(u);
            let problem: ProblemDTO = {
                base64: this.image,
                user: u.__id,
                problem_description: this.description,
                short_description: form.short_description,
                machine: this.machine.__id
            };
            this.problemService.addProblem(problem).subscribe(() => console.log('Formulaire bien envoyé'));

        });
    }

    private onChange(event: any) {
        // get value from text area
        this.description = event.target.value;
    }

}
