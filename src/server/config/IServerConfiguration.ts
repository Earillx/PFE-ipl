import {IHelmetConfiguration} from 'helmet';
import {DecodeOptions, SignOptions, VerifyOptions} from 'jsonwebtoken';


export default class IServerConfiguration {

    port?: number;

    prefix?: string;

    helmet?: IHelmetConfiguration;

    jwt?: IJWTOptions;

    dbURI?: string;
}


export interface IJWTOptions {

    secret?: string;

    sign?: SignOptions;

    verify?: VerifyOptions;

    decode?: DecodeOptions;

}
