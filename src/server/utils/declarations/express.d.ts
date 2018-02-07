import {UserDTO} from "../../../shared/UserDTO";


declare module 'express' {


    export interface Request {

        userContext?: UserDTO;

        authToken?: string;

    }

}
