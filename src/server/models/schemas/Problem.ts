import { Document, Schema, Model, model } from 'mongoose';
import { ProblemDTO } from '../../../shared/ProblemDTO';


export interface IProblemModel extends ProblemDTO, Document {
    // methods.. (password encryption here?)
}


export const ProblemSchema: Schema = new Schema({
    __id: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    snapshot_machine: { type: Schema.Types.ObjectId, ref: 'Machine' },
    problem_description: String,
    problem_photos: [{
        uri: String,
    }],
    status: String,
    date: Date,
});

ProblemSchema.pre('save', function (next) {
    // pre save checks here
    next();
});

export const Problem: Model<IProblemModel> = model<IProblemModel>('Problem', ProblemSchema);
