import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IMachineModel, MachineSchema, Machine} from '../models/schemas/Machine';
import * as mongoose from 'mongoose';

export default class MachineController extends Controller {

    static readonly URI = '/machine/:id?';

    /**
     *    @swagger
     *    /api/machine/getMachine:
     *    get:
     *       summary: gets a machine by its id
     *       description: allows to retrieve a machine based on its id number
     *       tags: [Machine]
     *       produces:
     *           - application/json
     *       parameters:
     *           - name: id
     *             required : true
     *       responses:
     *           200:
     *              description: machine found
     *           404:
     *              description: machine not found
     */
    @HttpGet('')
    static getMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
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
        console.log(`[MachinesApi.get] Retrieving machine: {id: ${request.params.id}}.`);

        // Finds the machine
        Machine.findById(id).then((machine: IMachineModel) => {
            // verify machine was found
            if (machine === null) {
                response.sendStatus(404);
                next();
                return;
            }

            // sends json response
            response.json(machine);
            next();
        }).catch(next);
    }

    /**
     *    @swagger
     *    /api/machine/postMachine:
     *    post:
     *       summary: creates a machine
     *       description: allows to create a machine
     *       tags: [Machine]
     *       produces:
     *           - application/json
     *       parameters:
     *           - in: body
     *             name: body
     *             description: machine to create
     *             required : true
     *       responses:
     *           200:
     *              description: machine created
     *           500:
     *              description: impossible to create a machine
     */
    @HttpPost('')
    static postMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        let Machine = mongoose.model('Machine', MachineSchema);
        /* Uncomment the following line to test the database insert with mock data :
        let mockMachine = new Machine({name: 'mockMachine', ip_address: '128.45.55.15', mac_address: 'A1:B2:C3:D4:E5', comment: 'Commented machine', isAvailable: true, local: 'A17'});
        */

        let newMachine = new Machine(request.body);
        newMachine.save({}, (err, createdMachineObject) => {
            if (err) {
                return response.status(500).send(err);
            }
            response.status(200).send(createdMachineObject);
        });
    }

    /**
     *    @swagger
     *    /api/machine/updateMachine:
     *    put:
     *       summary: updates a machine
     *       description: allows to update a machine
     *       tags: [Machine]
     *       produces:
     *           - application/json
     *       parameters:
     *           - in: body
     *             name: body
     *             description: machine to create
     *             required : true
     *       responses:
     *           200:
     *              description: machine updated
     *           500:
     *              description: impossible to update a machine
     */
    @HttpPut('')
    static updateMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Machine.findById(request.params.id, (err, machine) => {
            // Handles any possible database errors
            if (err) {
                response.status(500).send(err);
            } else {
                // Updates each attribute with any possible attribute that may have been submitted in the body of the request.
                // If that attribute isn't in the request body, default back to whatever it was before.
                machine.name = request.body.name || machine.name;
                machine.ip_address = request.body.ip_address || machine.ip_address;
                machine.mac_address = request.body.mac_address || machine.mac_address;
                machine.comment = request.body.comment || machine.comment;
                machine.isAvailable = request.body.isAvailable || machine.isAvailable;
                machine.local = request.body.local || machine.local;
                // Saves the updated document back to the database
                machine.save({},(err2, machine2) => {
                    if (err) {
                        response.status(500).send(err2);
                    }
                    response.status(200).send(machine2);
                });
            }
        });
    }

    /**
     *    @swagger
     *    /api/machine/deleteMachine:
     *    delete:
     *       summary: deletes a machine
     *       description: allows to delete a machine
     *       tags: [Machine]
     *       produces:
     *           - application/json
     *       parameters:
     *           - in: body
     *             name: body
     *             description: machine to delete
     *             required : true
     *       responses:
     *           200:
     *              description: machine deleted
     *           500:
     *              description: impossible to delete a machine
     */
    @HttpDelete('')
    static deleteMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The Machine in this callback function represents the document that was found.
        // It allows you to pass a reference back to the client in case they need a reference for some reason.
        Machine.findByIdAndRemove(request.params.id, (err, machine) => {
            if (err) {
                response.status(500).send(err);
            }
            // We'll create a simple object to send back with a message and the id of the document that was removed.
            let responseMessage = {
                message: 'Machine successfully deleted',
                id: machine._id
            };
            response.status(200).send(responseMessage);
        });
    }

}