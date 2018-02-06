import {IHelmetConfiguration} from 'helmet';
import {SignOptions, VerifyOptions, DecodeOptions} from 'jsonwebtoken';


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
