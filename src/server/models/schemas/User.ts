import { Document, Schema, Model, model } from 'mongoose';
import { UserDTO } from '../../../shared/UserDTO';


export interface IUserModel extends UserDTO, Document {
    // methods.. (password encryption here?)
}

export const UserSchema: Schema = new Schema({
    __id: Number,
    email: String,
});

UserSchema.pre('save', function (next) {
    // pre save operations here
    next();
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
