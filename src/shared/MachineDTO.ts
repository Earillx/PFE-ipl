export interface MachineDTO {
    __id: number;
    name?: string;
    ip_address?: string;
    mac_address?: string;
    comment?: string;
    isAvailable?: boolean;
    url_etiquette?: string;
    local?: string;
}