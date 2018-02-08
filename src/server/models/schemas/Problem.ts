import {Document, Model, model, Schema} from 'mongoose';
import {ProblemDTO, Status} from '../../../shared/ProblemDTO';
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
    status: String,
    type: Number,
    date: Date,
    base64: String,
});

ProblemSchema.pre("save", function(next) {
    if (this.user === undefined || this.user === '') {
        throw new Error("Il faut un utilisateur.");
    }
    if (this.machine === undefined || this.machine === '') {
        throw new Error("Il faut une machine.");
    }
    if (this.problem_description === undefined || this.problem_description === '') {
        throw new Error("Il faut une description.");
    }
    if (this.status === undefined) {
        throw new Error('Il faut un statut.');
    }
    if (this.status < 0 || this.status > (Object.keys(Status).length / 2)) {
        throw new Error('Statut invalide.');
    }
    next();
});

ProblemSchema.post("save", function() {
    console.log("Un problème a été sauvegardé avec succès sous l'id '%s'.", this._id);
});

export const Problem: Model<IProblemModel> = model<IProblemModel>('Problem', ProblemSchema);
