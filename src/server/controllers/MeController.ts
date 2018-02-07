import Controller from './Controller';
import * as express from 'express';
import {HttpDelete, HttpGet, HttpPost} from '../utils/annotations/Routes';
import TokenMiddleware from '../utils/middleware/tokens';
import * as JsonWebToken from 'jsonwebtoken';
import {User} from '../models/schemas/User';
import Token from "../utils/middleware/tokens/Token";


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
 *                  description: userFound + token
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
        res.send(req.userContext);
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
                const token = new Token(userFound);
                const encryptedToken = JsonWebToken.sign(
                    token,
                    TokenMiddleware.options.secret,
                    TokenMiddleware.options.sign
                );

                return res.status(200).send({
                    user: userFound,
                    token: encryptedToken
                });
            }
        });
    }

    /**
     *  @swagger
     *  /api/me/:
     *  delete:
     *      summary: delete the current user's auth cookie
     *      tags: [User]
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: auth cookie deleted
     */
    @HttpDelete('')
    static deleteAuthCookie(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.clearCookie('authToken');
        response.status(200).send();
    }

}
