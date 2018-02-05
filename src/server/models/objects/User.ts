import {UserDTO} from '../../../shared/UserDTO';

export class User implements UserDTO {
    __id: number;
    email: string;
    constructor(__id: number, email: string) {
        this.__id = __id;
        this.email = email;
    }
    // methods here?
}
