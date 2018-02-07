import {UserDTO} from "../../../../shared/UserDTO";
import * as Checksum from 'checksum';


export default class Token {

    readonly user: UserDTO;
    readonly checksum: string;

    constructor(user: UserDTO) {
        this.user = user;
        this.checksum = Checksum(JSON.stringify(this.getUserFields()));
    }

    getUserFields(): Object {
        return {
            __id : this.user.__id,
            email: this.user.email
        };
    }

}
