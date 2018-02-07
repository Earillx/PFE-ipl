import Controller from './Controller';
import * as express from 'express';
import {HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import TokenMiddleware from '../utils/middleware/tokens';
import SecurityContext from '../utils/middleware/tokens/SecurityContext';
import * as JsonWebToken from 'jsonwebtoken';
import * as Checksum from 'checksum';
import {User} from '../models/schemas/User';

/**
 * @swagger
 *  /api/me/:
 *      get:
 *          summary: obtain user auth configuration based on its token
 *          tags: [ Tokens ]
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: __token
 *                description: encrypted token
 *                in: query
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: SecurityContextDTO
 *              301:
 *                  description: Error
 *      post:
 *          summary: obtain a new token based on credentials. Returns a security context DTO and places the token in the response's cookie
 *          tags: [ Tokens ]
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: body
 *                name: login data
 *                description: user login
 *                required: true
 *                schema:
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *          responses :
 *              200:
 *                  description: SecurityContextDTO
 *                  headers:
 *                      Set-Cookie:
 *                          schema:
 *                              type: string
 *                              example: JSESSIONID=abcde12345; Path=/; HttpOnly
 *              500:
 *                  description: internal error
 *              404:
 *                  description: user not found (invalid credentials?)
 */
export default class MeController extends Controller {

    static readonly URI = '/me';

    /**
     * Get current user security context
     */
    @HttpGet('/')
    static get(req: express.Request, res: express.Response): void {
        res.send(req.securityContext);
    }

    @HttpPost('/')
    static obtainToken(req: express.Request, res: express.Response): void {
        // res.write('New token');

        const email = req.body.email;
        const password = req.body.password;

        // Find user
        User.findOne({'email': email, 'password': password}, (err, userFound) => {
            if (err) {
                return res.status(500).send(err);
            } else  if (userFound === null) {
                return res.status(404).send(err);
            } {
                const userId = userFound.__id; // to change?
                const userGroup = 'admin';

                const token = JsonWebToken.sign({
                    userId,
                    userGroup,
                    checksum : Checksum(userId + userGroup)
                }, TokenMiddleware.options.secret, TokenMiddleware.options.sign);

                const context = new SecurityContext(userGroup, token, userId);
                res.cookie('authToken', token);
                return res.status(200).json(context);
            }
        });
    }

    /**
     * Refresh a security context
     */
    @HttpPut('/')
    static refreshToken(req: express.Request, res: express.Response): void {
        console.log('Refreshing token is not yet supported, re-using previous one');
        res.json(req.securityContext);
    }

}
