import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';

export interface ProblemDTO {
    __id: Number;
    user: UserDTO;
    snapshot_machine: MachineDTO;
    problem_description: String;
    problem_photos: String[];
    status: String;
    date: Date;
}
