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

    static handle(prefix: string, options: IJWTOptions): express.RequestHandler {
        this.options = options;

        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (!req.path.startsWith(prefix)) {
                next();
                return;
            }

            let auth_string = req.headers.authorization;

            if (typeof auth_string !== 'string') {
                auth_string = auth_string[0];
            }

            const regex: RegExp = /^token (.*)$/;

            if (!auth_string) {
                console.log('[auth] Anonymous authentification');
                req.securityContext = new SecurityContext('anonymous');
                return next();
            }

            const match = auth_string.match(regex);

            if (match == null) {
                console.log('[auth] Anonymous authentification');
                req.securityContext = new SecurityContext('anonymous');
                return next();
            }

            const token: string = match[1];

            try {
                const content: Token = JsonWebToken.verify(token, options.secret, options.verify) as Token;

                if (content.checksum !== Checksum(content.userId + content.userGroup)) {
                    throw new Error('Checksum do not match');
                }

                req.securityContext = new SecurityContext(content.userGroup, token, content.userId);
                return next();
            } catch (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }
        };
    }

}
