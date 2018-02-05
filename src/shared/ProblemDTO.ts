import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';

export interface ProblemDTO {
    __id: number;
    user?: UserDTO;
    snapshot_machine?: MachineDTO;
    problem_description?: string;
    problem_photos?: string[];
    status?: string;
    date?: Date;
}
