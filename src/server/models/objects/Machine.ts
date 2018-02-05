import {MachineDTO} from '../../../shared/MachineDTO';

export class Machine implements MachineDTO {
    __id: number;
    name: string;
    ip_address: string;
    mac_address: string;
    comment: string;
    isAvailable: boolean;
    url_etiquette: string;
    local: string;
    constructor(__id: number, name: string, ip_address: string, mac_address: string, comment: string,
                isAvailable: boolean, url_etiquette: string, local: string) {
        this.__id = __id;
        this.name = name;
        this.ip_address = ip_address;
        this.mac_address = mac_address;
        this.comment = comment;
        this.isAvailable = isAvailable;
        this.url_etiquette = url_etiquette;
        this.local = local;
    }
    // methods here?
}
