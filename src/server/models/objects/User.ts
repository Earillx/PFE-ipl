import {UserDTO} from '../../../shared/UserDTO';

export class User implements UserDTO {
    __id: number;
    email: string;
    password: string;
    constructor(__id: number, email: string, password: string) {
        this.__id = __id;
        this.email = email;
        this.password = password;
    }
    // methods here?
}
