import {Document, Model, model, Schema} from 'mongoose';
import {ProblemDTO} from '../../../shared/ProblemDTO';
import {UserSchema} from './User';
import {MachineSchema} from './Machine';
import {LogSchema} from './Log';


export interface IProblemModel extends ProblemDTO, Document {
    // methods.. (password encryption here?)
}


export const ProblemSchema: Schema = new Schema({
    user: UserSchema,
    machine: MachineSchema,
    problem_description: String,
    short_description: String,
    problem_photo: String,
    status: String,
    date: Date,
    base64: String,
    logs: [LogSchema],
});

ProblemSchema.pre('save', function(next) {
    if (this.user === undefined || this.user === '') {
        throw new Error('Il faut un utilisateur.');
    }
    if (this.machine === undefined || this.machine === '') {
        throw new Error('Il faut une machine.');
    }
    if (this.problem_description === undefined || this.problem_description === '') {
        throw new Error('Il faut une description.');
    }
    next();
});

ProblemSchema.post('save', function() {
    console.log('Un problème a été sauvegardé avec succès sous l\'id \'%s\'.', this._id);
});

export const Problem: Model<IProblemModel> = model<IProblemModel>('Problem', ProblemSchema);
