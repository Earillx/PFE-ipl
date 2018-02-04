import Controller from './Controller';
import * as express from 'express';
import {HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import TokenMiddleware from '../utils/middleware/tokens';
import SecurityContext from '../utils/middleware/tokens/SecurityContext';
import * as JsonWebToken from 'jsonwebtoken';
import {SecurityContextDTO} from '../../shared/SecurityContextDTO';
import * as Checksum from 'checksum';

/**
 * @swagger
 *  /api/me/:
 *      post:
 *          summary: obtain a new token based on credentials
 *          produces:
 *              - application/json
 *          responses :
 *              200:
 *                  description: SecurityContextDTO
 *              301:
 *                  description: ErrorMessage
 */
export default class MeController extends Controller {

    /**
     * Get current user security context
     */
    @HttpGet('/')
    static get(req: express.Request, res: express.Response): void {
        console.log(req.securityContext);

        res.send(req.securityContext as SecurityContextDTO);
    }

    @HttpPost('/')
    static obtainToken(req: express.Request, res: express.Response): void {
        // res.write('New token');

        const username = 'aze';
        const password = 'aze';

        // Find user

        const userId = 1;
        const userGroup = 'user';
        const token = JsonWebToken.sign({
            userId,
            userGroup,
            checksum : Checksum(userId + userGroup)
        }, TokenMiddleware.options.secret, TokenMiddleware.options.sign);

        const context = new SecurityContext(userGroup, token, userId);

        res.json(context);
    }

    /**
     * Refresh a security context
     */
    @HttpPut('/')
    static refreshToken(req: express.Request, res: express.Response): void {
        const username = 'aze';
        const password = 'aze';

        res.send('aze');
    }

}
