import {Document, Model, model, Schema} from 'mongoose';
import {UserDTO} from '../../../shared/UserDTO';
import {ProblemSchema} from "./Problem";


export interface IUserModel extends UserDTO, Document {
    // methods.. (password encryption here?)
}

export const UserSchema: Schema = new Schema({
    email: String,
    password: String,
});

UserSchema.pre("save", function(next) {
    if (this.email === undefined || this.email === '') {
        throw new Error("Il faut un email.");
    }
    next();
});

UserSchema.post("save", function() {
    console.log("Un utilisateur a été sauvegardé avec succès sous l'id '%s'.", this._id);
});

export const User: Model<IUserModel> = model<IUserModel>('users', UserSchema);
