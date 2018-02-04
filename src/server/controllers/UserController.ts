import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IUserModel, UserSchema, User} from '../../schemas/user';
import * as mongoose from 'mongoose';

export default class UserController extends Controller {

    @HttpGet('/:id')
    static getUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // base sur le tuto : http://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
        // verify the id parameter exists
        const PARAM_ID = 'id';
        if (typeof request.params[PARAM_ID] === 'undefined' || request.params[PARAM_ID] === null) {
            response.sendStatus(404);
            next();
            return;
        }

        // get the id
        let id = request.params[PARAM_ID];

        // log
        console.log(`[UsersApi.get] Retrieving user: {id: ${request.params.id}}.`);

        // find user
        User.findById(id).then((user: IUserModel) => {
            // verify user was found
            if (user === null) {
                response.sendStatus(404);
                next();
                return;
            }

            // send json responseponse
            response.json(user);
            next();
        }).catch(next);
    }

    @HttpPost('/')
    static postUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        let User = mongoose.model('User', UserSchema);
        let newUser = new User({username: 'mockRoger', password: 'mockPassRoger'});
        newUser.save((err, createdUserObject) => {
            if (err) {
                response.status(500).send(err);
            }
            response.status(200).send(createdUserObject);
        });
    }

    @HttpPut('/:id')
    static updateUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write('Update User');
        response.status(200);
        response.send();
    }

    @HttpDelete('/:id')
    static deleteUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write('Delete User');
        response.status(200);
        response.send();
    }

    @HttpGet('/all')
    static listUsers(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.write('Bonjour All');
        response.status(200);
        response.send();
    }

}
