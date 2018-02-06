import {ProblemDTO} from '../../../shared/ProblemDTO';
import {UserDTO} from '../../../shared/UserDTO';
import {MachineDTO} from '../../../shared/MachineDTO';

export class Problem implements ProblemDTO {
    __id: number;
    user: number | UserDTO;
    machine: number | MachineDTO;
    problem_description: string;
    short_description: string;
    problem_photo: string;
    date: Date;
    constructor(__id: number, user: number | UserDTO, machine: number | MachineDTO, problem_description: string,
                short_description: string, problem_photo: string, date: Date) {
        this.__id = __id;
        this.user = user;
        this.machine = machine;
        this.problem_description = problem_description;
        this.short_description = short_description;
        this.problem_photo = problem_photo;
        this.date = date;
    }
    // methods here?
}
