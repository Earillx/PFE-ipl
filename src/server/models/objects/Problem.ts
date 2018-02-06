import {ProblemDTO} from '../../../shared/ProblemDTO';
import {UserDTO} from '../../../shared/UserDTO';
import {MachineDTO} from '../../../shared/MachineDTO';

export class Problem implements ProblemDTO {
    __id: number;
    user_id: number;
    user: UserDTO;
    machine_id: number;
    machine_dto: MachineDTO;
    problem_description: string;
    short_description: string;
    problem_photo: string;
    date: Date;
    constructor(__id: number, user_id: number, user_dto: UserDTO, machine_id: number, machine_dto: MachineDTO, problem_description: string,
                short_description: string, problem_photo: string, date: Date) {
        this.__id = __id;
        this.user_id = user_id;
        this.user = user_dto;
        this.machine_id = machine_id;
        this.machine_dto = machine_dto;
        this.problem_description = problem_description;
        this.short_description = short_description;
        this.problem_photo = problem_photo;
        this.date = date;
    }
    // methods here?
}
