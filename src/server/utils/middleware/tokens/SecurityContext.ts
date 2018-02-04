

export default class SecurityContext {

    private static defaultGroup?: ISecurityContextUser = null;
    private static groups: { [key: string]: ISecurityContextUser } = {};
    public readonly group: ISecurityContextUser;
    public readonly groupName: string;
    public readonly userId?: number;
    public readonly token?: string;

    public static exportUser(user: string, userDTD: ISecurityContextUser): void {
        console.log('[Token middleware] Registering user security profile : ' + user);
        this.groups[user] = userDTD;
    }

    public static exportDefaultProfile(userDTD: ISecurityContextUser): void {
        this.defaultGroup = userDTD;
    }


    constructor(group: string, token?: string, userId?: number) {
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
