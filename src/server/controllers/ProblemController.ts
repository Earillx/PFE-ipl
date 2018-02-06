import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IProblemModel, ProblemSchema, Problem} from '../models/schemas/Problem';
import * as mongoose from 'mongoose';
import {Machine} from "../models/schemas/Machine";
import {ProblemDTO} from "../../shared/ProblemDTO";
import {User} from "../models/schemas/User";

export default class ProblemController extends Controller {

    static readonly URI = '/machine/:id?';

    /**
     *    @swagger
     *    /api/problem/getProblem:
     *    get:
     *       summary: gets a problem by its id
     *       description: allows to retrieve a problem based on its id number
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *           - name: id
     *             required : true
     *       responses:
     *           200:
     *              description: problem found
     *           404:
     *              description: problem not found
     */
    @HttpGet('')
    static getProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // Based on tutorial from http://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
        // Verifies if the id parameter exists
        const PARAM_ID = 'id';
        if (typeof request.params[PARAM_ID] === 'undefined' || request.params[PARAM_ID] === null) {
            response.sendStatus(404);
            next();
            return;
        }

        // Gets the id
        let id = request.params[PARAM_ID];

        // Logs
        console.log(`[ProblemsApi.get] Retrieving problem: {id: ${request.params.id}}.`);

        // Finds the problem
        Problem.findById(id).then((problem: IProblemModel) => {
            // verify problem was found
            if (problem === null) {
                response.sendStatus(404);
                next();
                return;
            }

            // sends json response
            response.json(problem);
            next();
        }).catch(next);
    }

    /**
     *    @swagger
     *    /api/problem/postProblem:
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
     *                      user_id:
     *                          type: integer
     *                      machine:
     *                          type: integer
     *                      problem_description:
     *                          type: string
     *                      short_description:
     *                          type: string
     *                      problem_photo:
     *                          type: string
     *                      date:
     *                          type: date
     *       responses:
     *           200:
     *              description: problem created
     *           500:
     *              description: impossible to create a problem
     */
    @HttpPost('')
    static postProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const newProblem = new Problem(request.body);

        // here we have to find the problem's user_id and machine in the DB then replace the
        // properties newProblem.user_id and newProblem.machine by their respective json data
        Machine.findById(newProblem.machine_id, (err, machineFound) => {
            newProblem.machine = new Machine(machineFound);
        });
        User.findById(newProblem.user_id, (err, userFound) => {
            newProblem.user = new User(userFound);
        });
        newProblem.save({}, (err, createdProblemObject) => {
            if (err) {
                return response.status(500).send(err);
            }
            response.status(200).send(createdProblemObject);
        });
    }

    /**
     *    @swagger
     *    /api/problem/updateProblem:
     *    put:
     *       summary: updates a problem
     *       description: allows to update a problem
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *           - in: body
     *             name: body
     *             description: problem to create
     *             required : true
     *       responses:
     *           200:
     *              description: problem updated
     *           500:
     *              description: impossible to update a problem
     */
    @HttpPut('')
    static updateProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Problem.findById(request.params.id, (err, problem) => {
            // Handles any possible database errors
            if (err) {
                response.status(500).send(err);
            } else {
                // Updates each attribute with any possible attribute that may have been submitted in the body of the request.
                // If that attribute isn't in the request body, default back to whatever it was before.
                problem.user_id = request.body.name || problem.user_id;
                problem.machine_id = request.body.name || problem.machine_id;
                problem.problem_description = request.body.name || problem.problem_description;
                problem.problem_photo = request.body.name || problem.problem_photo;
                problem.date = request.body.name || problem.date;
                // Saves the updated document back to the database
                problem.save({},(err2, problem2) => {
                    if (err) {
                        response.status(500).send(err2);
                    }
                    response.status(200).send(problem2);
                });
            }
        });
    }

    /**
     *    @swagger
     *    /api/problem/deleteProblem:
     *    delete:
     *       summary: deletes a problem
     *       description: allows to delete a problem
     *       tags: [Problem]
     *       produces:
     *           - application/json
     *       parameters:
     *           - in: body
     *             name: body
     *             description: problem to delete
     *             required : true
     *       responses:
     *           200:
     *              description: problem deleted
     *           500:
     *              description: impossible to delete a problem
     */
    @HttpDelete('')
    static deleteProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The Machine in this callback function represents the document that was found.
        // It allows you to pass a reference back to the client in case they need a reference for some reason.
        Problem.findByIdAndRemove(request.params.id, (err, problem) => {
            if (err) {
                response.status(500).send(err);
            }
            // We'll create a simple object to send back with a message and the id of the document that was removed.
            let responseMessage = {
                message: 'Problem successfully deleted',
                id: problem._id
            };
            response.status(200).send(responseMessage);
        });
    }

}
