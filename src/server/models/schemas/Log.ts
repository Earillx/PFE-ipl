import {Document, Model, model, Schema} from 'mongoose';
import {LogDTO} from '../../../shared/LogDTO';

export interface ILogModel extends LogDTO, Document {
}

export const LogSchema: Schema = new Schema({
    type: String,
    description: String,
    date: String,
    user: String,
});

export const Log: Model<ILogModel> = model<ILogModel>('logs', LogSchema);
