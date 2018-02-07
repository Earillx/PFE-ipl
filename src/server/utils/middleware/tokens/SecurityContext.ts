import {AppSecurityContext} from "../../../../shared/SecurityContextDTO";


export default class SecurityContext {

    private static defaultGroup?: AppSecurityContext = null;
    private static groups: { [key: string]: AppSecurityContext } = {};
    public readonly group: AppSecurityContext;
    public readonly groupName: string;
    public readonly userId?: string;
    public readonly token?: string;

    public static exportUser(user: string, userDTD: AppSecurityContext): void {
        console.log('[Token middleware] Registering user security profile : ' + user);
        this.groups[user] = userDTD;
    }

    public static exportDefaultProfile(userDTD: AppSecurityContext): void {
        this.defaultGroup = userDTD;
    }

    constructor(group: string, token?: string, userId?: string) {
        if (!SecurityContext.groups.hasOwnProperty(group)) {
            this.group = SecurityContext.defaultGroup;
        } else {
            this.group = SecurityContext.groups[group];
        }

        this.token = token;
        this.groupName = group;
        this.userId = userId;
    }


}



export interface ISecurityContextUser {


}
