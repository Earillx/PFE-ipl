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
/*
MachineSchema.pre("save", function(next) {
    if (this.name === '') {
        next(new Error('The name may not be empty.'));
    }
    if (this.is_available !== undefined) {
        next(new Error('An availability must be set.'));
    }
    if (this.local === '') {
        next(new Error('The local may not be empty.'));
    }
    next();
});

MachineSchema.post("save", function(doc) {
    console.log("The machine was successfully saved under '%s' ID.", this.__id);
});
*/
export const Machine: Model<IMachineModel> = model<IMachineModel>('Machine', MachineSchema);
