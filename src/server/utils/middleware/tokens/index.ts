import {IJWTOptions} from '../../../config/IServerConfiguration';
import * as express from 'express';
import * as Checksum from 'checksum';
import * as JsonWebToken from 'jsonwebtoken';
import Token from './Token';

/**
 * Middle ware for token parsing
 */
export default class TokenMiddleware {

    static options: IJWTOptions;

    static handle(prefix: string, options: IJWTOptions): express.RequestHandler {
        this.options = options;

        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (typeof req.path !== 'string' || typeof prefix !== 'string' || !req.path.startsWith(prefix)) {
                next();
                return;
            }

            let auth_string = req.headers.authorization;

            if (auth_string == null) {
               next();
               return;
            }

            if (typeof auth_string !== 'string') {
                auth_string = auth_string[0];
            }

            const regex: RegExp = /^token (.*)$/;

            if (null === auth_string.match(regex)) {
                console.log('[auth] Anonymous authentification');
                req.userContext = null;
                return next();
            }

            const match = auth_string.match(regex);

            const token: string = match[1];

            try {
                const content: Token = JsonWebToken.verify(token, options.secret, options.verify) as Token;

                if (Checksum(JSON.stringify(content.user)) !== content.checksum) {
                    console.log("Token mismatch while comparing checksum");
                    throw new Error('Une erreur est survenue durant la validation du token de connection');
                }

                console.log('Say hi to ' + content.user.email);

                req.userContext = content.user;
                req.authToken = token;
                return next();
            } catch (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }
        };
    }
}
