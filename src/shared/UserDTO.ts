import {LogDTO} from './LogDTO';

export interface UserDTO {
    __id?: string;
    email?: string;
    password?: string;
    logs?: LogDTO[];
}
