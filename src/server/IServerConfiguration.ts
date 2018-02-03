import {IHelmetConfiguration} from 'helmet';


export default class IServerConfiguration {

    port?: number;

    prefix?: string;

    helmet?: IHelmetConfiguration;

}
