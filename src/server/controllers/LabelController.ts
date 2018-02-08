import * as express from 'express';
import Controller from './Controller';
import {HttpGet} from '../utils/annotations/Routes';
import {Machine} from "../models/schemas/Machine";

export default class LabelController extends Controller {

    static readonly URI = '/label';

    /**
     * @swagger
     * /api/label/{room_name}:
     *  get:
     *      summary: get a link to pdf with all machines in a room
     *      tags: [Label]
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: room_name
     *            description: room's name
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: room found
     *          404:
     *              description: no room found with this name
     *          500:
     *              description: internal error during retrieval
     */
    @HttpGet(':room_name')
    static getLabelsFromRoom(request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.status(200).send('route labels room');
    }

    /**
     * @swagger
     * /api/label:
     *  get:
     *      summary: get a link to pdf with all machines
     *      tags: [Label]
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: OK
     *          500:
     *              description: internal error during retrieval
     */
    @HttpGet('')
    static getAllLabels(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Machine.find({}, (err, machinesFound) => {
            if (machinesFound === null) {
                response.status(404).send();
            } else {
                machinesFound.forEach((machine) => {
                    machine = machine.toObject();
                    machine.__id = machine._id;
                });
                console.log(machinesFound);
                response.status(200).send(machinesFound);
            }
        });
        // response.status(200).send('route all labels ');
    }
}



