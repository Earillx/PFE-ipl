import { Document, Schema, Model, model } from 'mongoose';
import { ProblemDTO } from '../../../shared/ProblemDTO';
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
    date: Date,
});

ProblemSchema.pre('save', function (next) {
    // pre save checks here
    next();
});

export const Problem: Model<IProblemModel> = model<IProblemModel>('Problem', ProblemSchema);
