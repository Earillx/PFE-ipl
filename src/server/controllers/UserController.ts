import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IUserModel, UserSchema, User} from '../models/schemas/User';
import * as mongoose from 'mongoose';
import {AdminSecurityContext} from '../config/SecurityContextGroups';
import {UserDTO} from '../../shared/UserDTO';

export default class UserController extends Controller {

    static readonly URI = '/user/:id?';

    /**
     * @swagger
     * /api/user/:
     *  get:
     *      summary: get a single user from an id
     *      tags: [User]
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: id of the user to fetch
     *            required: true
     *            type: integer
     *      responses:
     *          200:
     *              description: user found
     *          404:
     *              description: no user found with this id
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
     * @swagger
     *  post:
     *      summary: insert a new user from JSON data
     *      parameters:
     *        - in: body
     *          name: user data
     *          required: true
     *          schema:
     *              properties:
     *                  __id:
     *                      type: integer
     *                  email:
     *                      type: string
     *      tags: [User]
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: user inserted in database
     *          500:
     *              description: error during database insertion
     */
    @HttpPost('')
    static postUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        console.log('entered post');
        let User = mongoose.model('User', UserSchema);
        /* Uncomment the following line to test the database insert with mock data
        let mockUser = new User({username: 'mockRoger', password: 'mockPassRoger'});
        */

        let newUser = new User(request.body);
        newUser.save({}, (err, createdUserObject) => {
            console.log('entered save promise');
            if (err) {
                console.log('entered save promise error');
                return response.status(500).send(err);
            }
            response.status(200).send(createdUserObject);
        });
        console.log('FIN');
    }

    /**
     * @swagger
     *  put:
     *      summary: update a new user from new JSON data and an ID
     *      tags: [User]
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: id of the user to update
     *            required: true
     *            type: integer
     *      responses:
     *          200:
     *              description: new user data
     *          500:
     *              description: error during database update
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
                user.email = request.body.email || user.email;
                // Save the updated document back to the database
                user.save({},(err2, user2) => {
                    if (err) {
                        response.status(500).send(err2);
                    }
                    response.status(200).send(user2);
                });
            }
        });
    }

    /**
     * @swagger
     *  delete:
     *      summary: delete a single user from an ID
     *      tags: [User]
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: id of the user to delete
     *            required: true
     *            type: integer
     *      responses:
     *          200:
     *              description: user deleted from the database
     *          500:
     *              description: error during database deletion
     */
    @HttpDelete('')
    static deleteUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The user in this callback function represents the document that was found.
        // It allows you to pass a reference back to the client in case they need a reference for some reason.
        User.findByIdAndRemove(request.params.id, (err, user) => {
            if (err) {
                response.status(500).send(err);
            }
            // We'll create a simple object to send back with a message and the id of the document that was removed
            let responseMessage = {
                message: 'User successfully deleted',
                id: user._id
            };
            response.status(200).send(responseMessage);
        });
    }

}
