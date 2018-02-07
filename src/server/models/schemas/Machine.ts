import { Document, Schema, Model, model } from 'mongoose';
import { MachineDTO } from '../../../shared/MachineDTO';


export interface IMachineModel extends MachineDTO, Document {
    // methods here
}
export const MachineSchema: Schema = new Schema({
    name: String,
    ip_address: String,
    mac_address: String,
    comment: String,
    is_available: Boolean,
    url_etiquette: String,
    url_qr: String,
    local: String,
});

MachineSchema.pre('save', function (next) {
    // pre save operations here
    next();
});

export const Machine: Model<IMachineModel> = model<IMachineModel>('Machine', MachineSchema);
