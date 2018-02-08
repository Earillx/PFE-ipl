import * as express from 'express';
import Controller from './Controller';
import {HttpDelete, HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import {User} from '../models/schemas/User';
import Utils from "./Utils";
import {log_type_strings, log_types} from "../../shared/LogDTO";
import {Log} from '../models/schemas/Log';


export default class UserController extends Controller {

    static readonly URI = '/user/:id?';

    /**
     * @swagger
     * /api/user/{id}:
     *  get:
     *      summary: get a single user from an id
     *      tags: [User]
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: id
     *            description: id of the user to fetch
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: user found
     *          404:
     *              description: no user found with this id
     *          500:
     *              description: internal error during retrieval
     */
    @HttpGet('')
    static getUser(request: express.Request, response: express.Response, next: express.NextFunction): void {
        User.findById(request.params.id, (err, userFound) => {
            if (err) {
                response.status(500).send();
                return;
            } else if (userFound === null) {
                response.status(404).send();
            } else {
                userFound = userFound.toObject();
                userFound.__id = userFound._id;
                response.status(200).send(userFound);
            }
        });
    }

    /**
     *  @swagger
     *  /api/user/:
     *  post:
     *      summary: insert a new user from JSON data
     *      parameters:
     *        - in: body
     *          name: user data
     *          required: true
     *          schema:
     *              properties:
     *                  email:
     *                      type: string
     *                  password:
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
        const newUser = new User();
        newUser.email = request.body.email;
        newUser.password = request.body.password;
        // creating log
        const newLog = new Log();
        newLog.type = log_types[0];
        newLog.description = log_type_strings[newLog.type];
        newLog.date = Date.now().toString();
        newUser.logs.push(newLog);

        newUser.save({}, (err, savedUser) => {
            if (err) {
                return response.status(500).send(Utils.formatValidationErrorToFront(err));
            } else if (savedUser === null) {
                return response.status(404).send();
            } else {
                savedUser = savedUser.toObject();
                console.log(savedUser);
                savedUser.__id = savedUser._id;
                response.status(200).send(savedUser);
            }
        });
    }

    /**
     *  @swagger
     *  /api/user/{id}:
     *  put:
     *      summary: update a new user from new JSON data and an ID
     *      tags: [User]
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: id
     *            description: id of the user to update
     *            required: true
     *            type: string
     *          - in: body
     *            name: user data
     *            required: true
     *            schema:
     *              properties:
     *                  email:
     *                      type: string
     *                  password:
     *                      type: string
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
            } else if (user === null) {
                response.status(404).send();
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the requestuest body, default back to whatever it was before.
                user.email = request.body.email || user.email;
                user.password = request.body.password || user.password;
                // Save the updated document back to the database
                // creating log
                const newLog = new Log();
                newLog.type = log_types[1];
                newLog.description = log_type_strings[newLog.type];
                newLog.date = Date.now().toString();
                user.logs.push(newLog);

                user.save({}, (err2, user2) => {
                    if (err) {
                        response.status(500).send(Utils.formatValidationErrorToFront(err2));
                    }
                    user2 = user2.toObject();
                    user2.__id = user2._id;
                    response.status(200).send(user2);
                });
            }
        });
    }

    /**
     *  @swagger
     *  /api/user/{id}:
     *  delete:
     *      summary: delete a single user from an ID
     *      tags: [User]
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: id
     *            description: id of the user to delete
     *            required: true
     *            type: string
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
        console.log(request.params);
        User.findByIdAndRemove(request.params.id, (err, user) => {
            if (err) {
                response.status(500).send(err);
            } else if (user === null) {
                response.status(404).send();
            } else {
                // We'll create a simple object to send back with a message and the id of the document that was removed
                let responseMessage = {
                    message: 'Utilisateur supprimé avec succès.',
                    id: user._id
                };
                response.status(200).send(responseMessage);
            }
        });
    }



}
