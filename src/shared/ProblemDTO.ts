import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';

export interface ProblemDTO {
    __id?: string;
    user?: string | UserDTO;
    machine?: string | MachineDTO;
    problem_description?: string;
    short_description?: string;
    problem_photo?: string;
    status?: string;
    date?: Date;
    base64?: string;
}
