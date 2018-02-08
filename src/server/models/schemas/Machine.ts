import {Document, Model, model, Schema} from 'mongoose';
import {MachineDTO} from '../../../shared/MachineDTO';
import {ProblemSchema} from "./Problem";


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

MachineSchema.pre("save", function(next) {
    if (this.name === undefined || this.name === '') {
        throw new Error("Il faut un nom.");
    }
    if (this.is_available === undefined) {
        throw new Error("Il faut une disponibilité.");
    }
    if (this.local === undefined || this.local === '') {
        throw new Error("Il faut un local.");
    }
    next();
});

MachineSchema.post("save", function() {
    console.log("Une machine a été sauvegardée avec succès sous l'id '%s'.", this._id);
});

export const Machine: Model<IMachineModel> = model<IMachineModel>('Machine', MachineSchema);
