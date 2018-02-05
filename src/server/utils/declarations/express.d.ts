import SecurityContext from '../middleware/tokens/SecurityContext';


declare module 'express' {

    export interface Request {

        securityContext: SecurityContext;

    }

}
