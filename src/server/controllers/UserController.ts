import * as express from 'express';
import Controller from "./Controller";
import {HttpGet, HttpPut} from "../utils/annotations/Routes";

export default class UserController extends Controller {

    @HttpGet('/')
    static getUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write("Bonjour user");
        response.status(200);
        response.send();
    }

    @HttpGet('/all')
    static listUsers(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write("Bonjour All");
        response.status(200);
        response.send();
    }

}
