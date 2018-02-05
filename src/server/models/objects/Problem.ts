import {ProblemDTO} from '../../../shared/ProblemDTO';
import {MachineDTO} from '../../../shared/MachineDTO';
import {UserDTO} from '../../../shared/UserDTO';

export class Problem implements ProblemDTO {
    __id: number;
    user: UserDTO;
    snapshot_machine: MachineDTO;
    problem_description: string;
    problem_photo: string;
    date: Date;
    constructor(__id: number, user: UserDTO, snapshot_machine: MachineDTO, problem_description: string,
                problem_photo: string, date: Date) {
        this.__id = __id;
        this.user = user;
        this.snapshot_machine = snapshot_machine;
        this.problem_description = problem_description;
        this.problem_photo = problem_photo;
        this.date = date;
    }
    // methods here?
}
