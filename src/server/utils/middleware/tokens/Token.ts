export default class Token {

    readonly userId: string;
    readonly userGroup: string;
    readonly checksum: string;

    constructor(userId: string, userGroup: string, checksum: string) {
        this.userId = userId;
        this.userGroup = userGroup;
        this.checksum = checksum;
    }

}
