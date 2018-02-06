export interface ProblemDTO {
    __id: number;
    user_id?: number;
    machine_id?: number;
    snapshot_machine?: number;
    problem_description?: string;
    short_description?: string;
    problem_photo?: string;
    status?: string;
    date?: Date;
}
