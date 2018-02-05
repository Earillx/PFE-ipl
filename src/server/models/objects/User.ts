import {UserDTO} from '../../../shared/UserDTO';

export class User implements UserDTO {
    email: string;
    constructor(email: string){
        this.email = email;
    }
    // methods here?
}
