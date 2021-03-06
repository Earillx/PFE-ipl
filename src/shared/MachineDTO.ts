import {LogDTO} from './LogDTO';

export interface MachineDTO {
    __id?: string;
    name?: string;
    ip_address?: string;
    mac_address?: string;
    comment?: string;
    is_available?: boolean;
    url_etiquette?: string;
    url_qr?: string;
    local?: string;
    logs?: LogDTO[];

}
