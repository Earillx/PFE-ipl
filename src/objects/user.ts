import {IUser} from '../interfaces/user';

export class User implements IUser {
    username: string;
    password: string;
    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
    // methods such as password encryption logic here?
}
