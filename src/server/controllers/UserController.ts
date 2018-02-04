import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IUserModel, UserSchema, User} from '../models/schemas/user';
import * as mongoose from 'mongoose';
import {AdminSecurityContext} from "../config/SecurityContextGroups";
import {IUser} from "../../interfaces/user";


export default class UserController extends Controller {

    static readonly URI = '/user/:id?';

    /**
     * Returns the user corresponding to the 'id' parameter of the GET request as JSON.
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    @HttpGet('')
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

            // send json response
            response.json(user);
            next();
        }).catch(next);
    }

    /**
     * Takes JSON data from the POST request to insert a new user in the database.
     * DTO's may be used in a future implementation.
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    @HttpPost('')
    static postUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        let User = mongoose.model('User', UserSchema);
        /* Uncomment the following line to test the database insert with mock data
        let mockUser = new User({username: 'mockRoger', password: 'mockPassRoger'});
        */

        let newUser = new User(request.body);
        newUser.save((err, createdUserObject) => {
            if (err) {
                response.status(500).send(err);
            }
            response.status(200).send(createdUserObject);
        });
    }

    /**
     * Updates the user corresponding to the 'id' parameter in the PUT requests with the data from the request's body.
     * Only the fields given will be updated, others will stay the same.
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    @HttpPut('')
    static updateUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        User.findById(request.params.id, (err, user) => {
            // Handle any possible database errors
            if (err) {
                response.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the requestuest body, default back to whatever it was before.
                user.username = request.body.title || user.username;
                user.password = request.body.description || user.password;
                // Save the updated document back to the database
                user.save((err2, user2) => {
                    if (err) {
                        response.status(500).send(err2);
                    }
                    response.status(200).send(user2);
                });
            }
        });
    }

    /**
     * Deletes user based on the 'id' parameter in the DELETE request. Returns the ID of the deleted user in the response.
     * @param {e.Request} request
     * @param {e.Response} response
     * @param {e.NextFunction} next
     */
    @HttpDelete('')
    static deleteUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The user in this callback function represents the document that was found.
        // It allows you to pass a reference back to the client in case they need a reference for some reason.
        User.findByIdAndRemove(request.params.id, (err, user) => {
            // We'll create a simple object to send back with a message and the id of the document that was removed
            let responseMessage = {
                message: 'User successfully deleted',
                id: user._id
            };
            response.status(200).send(responseMessage);
        });
    }

}
