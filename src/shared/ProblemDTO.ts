import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';

export interface ProblemDTO {
    __id?: number;
    user?: number;
    user_dto?: UserDTO;
    snapshot_machine?: number;
    snapshot_machine_dto?: MachineDTO;
    problem_description?: string;
    short_description?: string;
    problem_photo?: string;
    status?: string;
    date?: Date;
}
