import * as express from 'express';
import Controller from "./Controller";
import {HttpGet, HttpPut} from "../utils/annotations/Routes";

/**
 * @swagger
 * /api/user/:
 *  get:
 *      summary: get a single user
 *      tags: [User]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: User
 */
export default class UserController extends Controller {


    @HttpGet('/')
    public static getUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write("Bonjour user");
        response.status(200);
        response.send();
    }


    @HttpGet('/all')
    public static listUsers(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write("Bonjour All");
        response.status(200);
        response.send();
    }

}
