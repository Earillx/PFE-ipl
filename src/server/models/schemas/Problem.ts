import { Document, Schema, Model, model } from 'mongoose';
import { ProblemDTO } from '../../../shared/ProblemDTO';


export interface IProblemModel extends ProblemDTO, Document {
    // methods.. (password encryption here?)
}


export const ProblemSchema: Schema = new Schema({
    __id: Number,
    user_id: Number,
    machine_id: Number,
    problem_description: String,
    problem_photo: String,
    date: Date,
});

ProblemSchema.pre('save', function (next) {
    // pre save checks here
    next();
});

export const Problem: Model<IProblemModel> = model<IProblemModel>('Problem', ProblemSchema);
