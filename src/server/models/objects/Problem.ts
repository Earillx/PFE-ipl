import {ProblemDTO} from '../../../shared/ProblemDTO';
import {MachineDTO} from '../../../shared/MachineDTO';
import {UserDTO} from '../../../shared/UserDTO';

export class Problem implements ProblemDTO {
    __id: number;
    user: UserDTO;
    snapshot_machine: MachineDTO;
    problem_description: string;
    problem_photos: string[];
    status: string;
    date: Date;
    constructor(__id: number, user: UserDTO, snapshot_machine: MachineDTO, problem_description: string,
                problem_photos: string[], status: string, date: Date) {
        this.__id = __id;
        this.user = user;
        this.snapshot_machine = snapshot_machine;
        this.problem_description = problem_description;
        this.problem_photos = problem_photos;
        this.status = status;
        this.date = date;
    }
    // methods here?
}
