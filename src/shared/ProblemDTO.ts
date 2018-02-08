import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';
import {LogDTO} from './LogDTO';

export interface ProblemDTO {
    __id?: string;
    user?: UserDTO | string;
    machine?: MachineDTO | string;
    problem_description?: string;
    short_description?: string;
    problem_photo?: string;
    status?: string;
    date?: Date;
    base64?: string;
    logs?: LogDTO[];
}
