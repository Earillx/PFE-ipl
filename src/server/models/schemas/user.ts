import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../../../interfaces/user';


export interface IUserModel extends IUser, Document {
    // methods.. (password encryption here?)
}

export let UserSchema: Schema = new Schema({
    createdAt: Date,
    username: String,
    password: String
});

UserSchema.pre('save', function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
