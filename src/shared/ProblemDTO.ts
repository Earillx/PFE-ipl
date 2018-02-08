import {UserDTO} from './UserDTO';
import {MachineDTO} from './MachineDTO';

export enum Type {Accident, Breakdown, SessionProblem, HardwareProblem, SoftwareProblem}
export enum Status {InProgress, Closed, Opened}


export interface ProblemDTO {
    __id?: string;
    user?: UserDTO | string;
    machine?: MachineDTO | string;
    problem_description?: string;
    short_description?: string;
    problem_photo?: string;
    status?: Status;
    type?: Type;
    date?: Date;
    base64?: string;
}