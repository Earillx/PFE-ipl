import {Document, Model, model, Schema} from 'mongoose';
import {UserDTO} from '../../../shared/UserDTO';


export interface IUserModel extends UserDTO, Document {
    // methods.. (password encryption here?)
}

export const UserSchema: Schema = new Schema({
    email: String,
    password: String,
});
/*
UserSchema.pre('save', function(next) {
    if (this.email === undefined) {
        next(new Error("An email must be set."));
    }
    next();
});

UserSchema.post("save", function(doc) {
    console.log("The problem was successfully saved under '%s' ID.", this.__id);
});
*/
export const User: Model<IUserModel> = model<IUserModel>('users', UserSchema);
