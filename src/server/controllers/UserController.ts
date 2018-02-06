import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IUserModel, User} from '../models/schemas/User';
import {AdminSecurityContext} from '../config/SecurityContextGroups';
import {UserDTO} from '../../shared/UserDTO';

/**
 * @swagger
 * /api/user_id/:
 *  get:
 *      summary: get a single user_id from an id
 *      tags: [User]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: id of the user_id to fetch
 *            required: true
 *            type: integer
 *      responses:
 *          200:
 *              description: user_id found
 *          404:
 *              description: no user_id found with this id
 *  post:
 *      summary: insert a new user_id from JSON data
 *      parameters:
 *        - in: body
 *          name: user_id data
 *          required: true
 *          schema:
 *              properties:
 *                  email:
 *                      type: string
 *      tags: [User]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: user_id inserted in database
 *          500:
 *              description: error during database insertion
 *  put:
 *      summary: update a new user_id from new JSON data and an ID
 *      tags: [User]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: id of the user_id to update
 *            required: true
 *            type: integer
 *      responses:
 *          200:
 *              description: new user_id data
 *          500:
 *              description: error during database update
 *  delete:
 *      summary: delete a single user_id from an ID
 *      tags: [User]
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: id of the user_id to delete
 *            required: true
 *            type: integer
 *      responses:
 *          200:
 *              description: user_id deleted from the database
 *          500:
 *              description: error during database deletion
 */

export default class UserController extends Controller {

    static readonly URI = '/user_id/:id?';

    @HttpGet('')
    static getUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
    }

    @HttpPost('')
    static postUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const newUser = new User();
        newUser.email = request.body.email;
        newUser.password = request.body.password;
        newUser.save({}, (err, savedUser) => {
            if (err) {
                return response.status(500).send(err);
            } else {
                response.status(200).send(savedUser);
            }
        });
    }

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
                user.save({}, (err2, user2) => {
                    if (err) {
                        response.status(500).send(err2);
                    }
                    response.status(200).send(user2);
                });
            }
        });
    }

    @HttpDelete('')
    static deleteUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The user_id in this callback function represents the document that was found.
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
