import * as express from 'express';
import Controller from './Controller';
import {HttpDelete, HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import {Problem} from '../models/schemas/Problem';
import {Machine} from '../models/schemas/Machine';
import {User} from '../models/schemas/User';
import {Log} from '../models/schemas/Log';


export default class ProblemsController extends Controller {

    static readonly URI = '/problems/';

    /**
     *    @swagger
     *    /api/problems/:
     *    get:
     *       summary: get all problems
     *       description: allows to retrieve all problems
     *       tags: [Problems]
     *       produces:
     *        - application/json
     *       responses:
     *          200:
     *              description: problems found
     *          404:
     *              description: problems not found
     */
    @HttpGet('')
    static getProblem(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Problem.find({'machine.is_available': true}, (err, problemsFound) => {
            if (problemsFound === null) {
                response.status(404).send();
            } else {
                problemsFound.forEach((problem) => {
                    problem = problem.toObject();
                    problem.__id = problem._id;
                });
                response.status(200).send(problemsFound);
            }
        });
    }

}
