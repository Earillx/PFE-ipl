import Controller from './Controller';
import * as express from 'express';
import {HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import TokenMiddleware from '../utils/middleware/tokens';
import SecurityContext from '../utils/middleware/tokens/SecurityContext';
import * as JsonWebToken from 'jsonwebtoken';
import * as Checksum from 'checksum';
import {User} from "../models/schemas/User";
import {UserDTO} from "../../shared/UserDTO";

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
 *          summary: obtain a new token based on credentials
 *          tags: [ Tokens ]
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: login
 *                description: user login
 *                in: body
 *                type: string
 *                required: true
 *              - name: password
 *                description: user password
 *                in: body
 *                type: string
 *                required: true
 *          responses :
 *              200:
 *                  description: SecurityContextDTO
 *              301:
 *                  description: ErrorMessage
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

        const email = req.body.login;
        const password = req.body.password;

        // Find user
        User.findOne({'email': email, 'password': password}, (err, userFound: UserDTO) => {
            if (err) {
                return res.status(301).send(err);
            } else {
                console.log(userFound);
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
