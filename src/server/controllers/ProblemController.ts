import * as express from 'express';
import Controller from './Controller';
import {HttpDelete, HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import {Problem} from '../models/schemas/Problem';
import {Machine} from '../models/schemas/Machine';
import {User} from '../models/schemas/User';
import Utils from "./Utils";
import {Status} from "../../shared/ProblemDTO";

export default class ProblemController extends Controller {

    static readonly URI = '/problem/:id?';

    /**
     *    @swagger
     *    /api/problem/{id}:
     *    get:
     *       summary: gets a problem by its id
     *       description: allows to retrieve a problem based on its id string
     *       tags: [Problem]
     *       produces:
     *        - application/json
     *       parameters:
     *        - in: path
     *          name: id
     *          description: id of the problem to fetch
     *          required : true
     *          type: string
     *       responses:
     *          200:
     *              description: problem found
     *          404:
     *              description: problem not found
     *          500:
     *              internal error during insert
     */
    @HttpGet('')
    static getProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        if (!Utils.isValidMongooseObjectId(request.params.id)) {
            response.status(500).send("Identifiant du problème invalide.");
        }
        else {
            Problem.findById(request.params.id, (err, machineFound) => {
                if (err) {
                    response.status(500).send(err);
                } else if (machineFound === null) {
                    response.status(404).send();
                } else {
                    machineFound.__id = machineFound._id;
                    response.status(200).send(machineFound);
                }
            });
        }

    }

    /**
     *    @swagger
     *    /api/problem/:
     *    post:
     *       summary: creates a problem
     *       description: allows to create a problem
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *            - in: body
     *              name: problem json data
     *              description: problem to create
     *              required : true
     *              schema:
     *                  properties:
     *                      user:
     *                          type: string
     *                      machine:
     *                          type: string
     *                      problem_description:
     *                          type: string
     *                      short_description:
     *                          type: string
     *                      problem_photo:
     *                          type: string
     *       responses:
     *           200:
     *              description: problem created
     *           500:
     *              description: impossible to create a problem
     */
    @HttpPost('')
    static postProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const newProblem = new Problem(request.body);
        // here we have to find the problem's user and machine in the DB then replace the
        // properties newProblem.user and newProblem.machine by their respective json data
        if (!Utils.isValidMongooseObjectId(request.body.machine)) {
            response.status(500).send("Identifiant de la machine invalide.");
        }
        else {
            Machine.findById(request.body.machine, (err, machineFound) => {
                if (err) {
                    response.status(500).send(err);
                    return;
                } else if (machineFound === null) {
                    response.status(404).send("Impossible de trouver la machine.");
                    return;
                } else {
                    newProblem.machine = new Machine(machineFound);
                    if (!Utils.isValidMongooseObjectId(request.body.user)) {
                        response.status(500).send("Identifiant de l'utilisateur invalide.");
                    }
                    else {
                        User.findById(request.body.user, (err, userFound) => {
                            if (err) {
                                response.status(500).send(err);
                                return;
                            } else if (userFound === null) {
                                response.status(404).send("Impossible de trouver l'utilisateur.");
                                return;
                            } else {
                                newProblem.user = new User(userFound);
                                newProblem.date = new Date();
                                newProblem.status = Status.Opened;
                                if (request.body.base64) {
                                    Utils.generateImageFromBase64(request.body.base64, (file_path: string) => {
                                        newProblem.problem_photo = file_path;
                                        newProblem.save({}, (err: any, createdProblemObject) => {
                                            if (err) {
                                                response.status(500).send(err);
                                            } else {
                                                createdProblemObject.__id = createdProblemObject._id;
                                                response.status(200).send(createdProblemObject);
                                            }
                                        });
                                    });
                                } else {
                                    newProblem.save({}, (err: any, createdProblemObject) => {
                                        if (err) {
                                            console.log("ddddddddddddddddddddd");
                                            console.log(newProblem)
                                            response.status(500).send(err);
                                        } else {
                                            createdProblemObject.__id = createdProblemObject._id;
                                            response.status(200).send(createdProblemObject);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }

    }

    /**
     *    @swagger
     *    /api/problem/{id}:
     *    put:
     *       summary: updates a problem
     *       description: allows to update a problem
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *        - in: path
     *          name: id
     *          description: id of the problem to update
     *          required : true
     *          type: string
     *        - in: body
     *          name: problem json data
     *          description: problem to update
     *          required : true
     *          schema:
     *              properties:
     *                  user:
     *                      type: string
     *                  machine:
     *                      type: string
     *                  problem_description:
     *                      type: string
     *                  short_description:
     *                      type: string
     *                  problem_photo:
     *                      type: string
     *                  status:
     *                      type: string
     *       responses:
     *           200:
     *              description: problem updated
     *           404:
     *              description: problem to update not found
     *           500:
     *              description: impossible to update a problem
     */
    @HttpPut('')
    static updateProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        if (!Utils.isValidMongooseObjectId(request.params.id)) {
            response.status(500).send("Identifiant du problème invalide.");
        }
        else {
            Problem.findById(request.params.id, (err, problem) => {
                // Handles any possible database errors
                if (err) {
                    response.status(500).send(err);
                } else if (problem === null) {
                    response.status(404).send("Impossible de trouver le problème.");
                } else {
                    // Updates each attribute with any possible attribute that may have been submitted in the body of the request.
                    // If that attribute isn't in the request body, default back to whatever it was before.
                    problem.user = request.body.user || problem.user;
                    problem.machine = request.body.machine || problem.machine;
                    problem.problem_description = request.body.description || problem.problem_description;
                    problem.problem_photo = request.body.problem_photo || problem.problem_photo;
                    problem.date = new Date();
                    problem.status = request.body.status || problem.status;
                    // Saves the updated problem back to the database
                    problem.save({}, (err2, problem2) => {
                        if (err2) {
                            response.status(500).send(Utils.formatValidationErrorToFront(err2));
                        } else {
                            response.status(200).send(problem2);
                        }
                    });
                }
            });
        }

    }

    /**
     *    @swagger
     *    /api/problem/{problemId}/status/{statusId}:
     *    put:
     *       summary: changes a problem status
     *       description: allows to change a problem status
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *        - in: path
     *          name: problemId
     *          description: id of the problem to update
     *          required : true
     *          type: string
     *        - in: path
     *          name: statusId
     *          description: id of the new status
     *          required : true
     *          type: string
     *        - in: body
     *          name: status json data
     *          description: status update data
     *          required : true
     *          schema:
     *              properties:
     *                  userId:
     *                      type: string
     *       responses:
     *           200:
     *              description: problem status updated
     *           404:
     *              description: problem to update not found
     *           500:
     *              description: impossible to update a problem status
     */
    @HttpPut('/status/:statusId')
    static changeProblemStatus(request: express.Request, response: express.Response, next: express.NextFunction): void {
        if (!Utils.isValidMongooseObjectId(request.params.id)) {
            response.status(500).send("Identifiant du problème invalide.");
        }
        else {
            request.body.status = request.params.statusId;
            ProblemController.updateProblem(request, response, next);
        }
    }

    /**
     *    @swagger
     *    /api/problem/{id}:
     *    delete:
     *       summary: deletes a problem
     *       description: allows to delete a problem
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *        - in: path
     *          name: id
     *          description: id of the problem to delete
     *          required : true
     *          type: string
     *       responses:
     *           200:
     *              description: problem deleted
     *           404:
     *              description: problem not found
     *           500:
     *              description: impossible to delete a problem
     */
    @HttpDelete('')
    static deleteProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The Machine in this callback function represents the document that was found.
        // It allows you to pass a reference back to the client in case they need a reference for some reason.
        if (!Utils.isValidMongooseObjectId(request.params.id)) {
            response.status(500).send("Identifiant du problème invalide.");
        }
        else {
            Problem.findByIdAndRemove(request.params.id, (err, problem) => {
                if (err) {
                    response.status(500).send(Utils.formatValidationErrorToFront(err));
                } else if (problem === null) {
                    response.status(404).send();
                } else {
                    // We'll create a simple object to send back with a message and the id of the document that was removed.
                    let responseMessage = {
                        message: "Problème supprimé avec succès.",
                        id: problem._id
                    };
                    response.status(200).send(responseMessage);
                }
            });
        }

    }
}