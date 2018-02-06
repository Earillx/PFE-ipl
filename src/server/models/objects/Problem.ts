import {ProblemDTO} from '../../../shared/ProblemDTO';

export class Problem implements ProblemDTO {
    __id: number;
    user_id: number;
    machine_id: number;
    problem_description: string;
    short_description: string;
    problem_photo: string;
    date: Date;
    constructor(__id: number, user_id: number, machine_id: number, problem_description: string,
                short_description: string, problem_photo: string, date: Date) {
        this.__id = __id;
        this.user_id = user_id;
        this.machine_id = machine_id;
        this.problem_description = problem_description;
        this.short_description = short_description;
        this.problem_photo = problem_photo;
        this.date = date;
    }
    // methods here?
}
