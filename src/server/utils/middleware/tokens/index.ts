import {IJWTOptions} from '../../../config/IServerConfiguration';
import * as express from 'express';
import * as Checksum from 'checksum';
import * as JsonWebToken from 'jsonwebtoken';
import Token from './Token';
import SecurityContext from './SecurityContext';

/**
 * Middle ware for token parsing
 */
export default class TokenMiddleware {

    static options: IJWTOptions;

    static handle(options: IJWTOptions): express.RequestHandler {
        this.options = options;

        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (!req.query || !req.query.__token) {
                req.securityContext = new SecurityContext('anonymous');
                return next();
            }

            const token: string = req.query.__token;

            try {
                const content: Token = JsonWebToken.verify(token, options.secret, options.verify) as Token;

                if (content.checksum !== Checksum(content.userId + content.userGroup)) {
                    throw new Error('Checksum do not match');
                }

                req.securityContext = new SecurityContext(content.userGroup, content.userId);
                return next();
            } catch (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }
        };
    }

}
