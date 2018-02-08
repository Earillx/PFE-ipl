import {Document, Model, model, Schema} from 'mongoose';
import {ProblemDTO} from '../../../shared/ProblemDTO';
import {UserSchema} from './User';
import {MachineSchema} from './Machine';


export interface IProblemModel extends ProblemDTO, Document {
    // methods.. (password encryption here?)
}


export const ProblemSchema: Schema = new Schema({
    user: UserSchema,
    machine: MachineSchema,
    problem_description: String,
    short_description: String,
    problem_photo: String,
    status: Number,
    type: Number,
    date: Date,
});
/*
ProblemSchema.pre("save", function(next) {
    if (this.user === '' || this.user !== undefined) {
        next(new Error('A user must be set.'));
    }
    if (this.machine === '' || this.machine !== undefined) {
        next(new Error('A machine must be set.'));
    }
    if (this.problem_description === '') {
        next(new Error('The problem description may not be empty.'));
    }
    if (this.status === '') {
        next(new Error('A status must be set.'));
    }
    if (this.date !== undefined) {
        next(new Error('A date must be set.'));
    }
    next();
});

ProblemSchema.post("save", function(doc) {
    console.log("The problem was successfully saved under '%s' ID.", this.__id);
});
*/
export const Problem: Model<IProblemModel> = model<IProblemModel>('Problem', ProblemSchema);
