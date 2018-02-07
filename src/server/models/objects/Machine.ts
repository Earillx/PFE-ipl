import {MachineDTO} from '../../../shared/MachineDTO';

export class Machine implements MachineDTO {
    __id: string;
    name: string;
    ip_address: string;
    mac_address: string;
    comment: string;
    is_available: boolean;
    url_etiquette: string;
    url_qr: string;
    local: string;
    constructor(__id: string, name: string, ip_address: string, mac_address: string, comment: string,
                is_available: boolean, url_etiquette: string, url_qr: string, local: string) {
        this.__id = __id;
        this.name = name;
        this.ip_address = ip_address;
        this.mac_address = mac_address;
        this.comment = comment;
        this.is_available = is_available;
        this.url_etiquette = url_etiquette;
        this.url_qr = url_qr;
        this.local = local;
    }
    // methods here?
}
