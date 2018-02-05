import {ISecurityContextUser} from '../server/utils/middleware/tokens/SecurityContext';


export interface SecurityContextDTO {

    group: AppSecurityContext;
    groupName: string;
    userId?: number;
    token?: string;

}


export interface AppSecurityContext extends ISecurityContextUser {

    readonly canDoSomething: boolean;
    readonly canDoSomethingElse: boolean;

    readonly canCreateAccount: boolean;

}

