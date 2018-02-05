
export default class Token {

    readonly userId: number;
    readonly userGroup: string;
    readonly checksum: string;

    constructor(userId: number, userGroup: string, checksum: string) {
        this.userId = userId;
        this.userGroup = userGroup;
        this.checksum = checksum;
    }

}
