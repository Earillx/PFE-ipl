import {ProblemDTO, Status, Type} from '../../../shared/ProblemDTO';
import {UserDTO} from '../../../shared/UserDTO';
import {MachineDTO} from '../../../shared/MachineDTO';

export class Problem implements ProblemDTO {
    __id: string;
    user: string | UserDTO;
    machine: string | MachineDTO;
    problem_description: string;
    short_description: string;
    problem_photo: string;
    status: Status;
    type: Type;
    date: Date;
    base64: string;

    constructor(__id: string, user: string | UserDTO, machine: string | MachineDTO, problem_description: string,
                short_description: string, problem_photo: string, type: string, base64: string) {
        this.__id = __id;
        this.user = user;
        this.machine = machine;
        this.problem_description = problem_description;
        this.short_description = short_description;
        this.problem_photo = problem_photo;
        this.type = Type[type];
        this.base64 = base64;
    }

    // methods here?
}
