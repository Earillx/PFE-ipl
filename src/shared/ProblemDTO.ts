import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';

export interface ProblemDTO {
    __id?: number;
    user_id?: number;
    user?: UserDTO;
    machine_id?: number;
    machine?: MachineDTO;
    problem_description?: string;
    short_description?: string;
    problem_photo?: string;
    status?: string;
    date?: Date;
}
