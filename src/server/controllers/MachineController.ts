import * as express from 'express';
import Controller from './Controller';
import {HttpDelete, HttpGet, HttpPost, HttpPut} from '../utils/annotations/Routes';
import {Machine} from '../models/schemas/Machine';

export default class MachineController extends Controller {

    static readonly URI = '/machine/:id?';

    /**
     *    @swagger
     *    /api/machine/{id}:
     *    get:
     *       summary: gets a machine by its id
     *       description: allows to retrieve a machine based on its id string
     *       tags: [Machine]
     *       produces:
     *        - application/json
     *       parameters:
     *        - in: path
     *          name: id
     *          description: id of the machine to fetch
     *          required : true
     *          type: string
     *       responses:
     *          200:
     *              description: machine found
     *          404:
     *              description: machine not found
     */
    @HttpGet('')
    static getMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Machine.findById(request.params.id, (err, machineFound) => {
            if (err) {
                response.status(500).send();
            } else if (machineFound === null) {
                response.status(404).send();
            } else {
                machineFound = machineFound.toObject();
                machineFound.__id = machineFound._id; // this could be done in a hook to be cleaner
                response.status(200).send(machineFound);
            }
        });
    }

    /**
     *    @swagger
     *    /api/machine/:
     *    post:
     *       summary: creates a machine
     *       description: allows to create a machine
     *       tags: [Machine]
     *       produces:
     *        - application/json
     *       parameters:
     *        - in: body
     *          name: body
     *          description: machine to create
     *          required : true
     *          schema:
     *              properties:
     *                  name:
     *                      type: string
     *                  ip_address:
     *                      type: string
     *                  mac_address:
     *                      type: string
     *                  comment:
     *                      type: string
     *                  is_available:
     *                      type: boolean
     *                  url_etiquette:
     *                      type: string
     *                  url_qr:
     *                      type: string
     *                  local:
     *                      type: string
     *       responses:
     *           200:
     *              description: machine created
     *           500:
     *              description: impossible to create a machine
     */
    @HttpPost('')
    static postMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const newMachine = new Machine(request.body);
        newMachine.save({}, (err, createdMachineObject) => {
            if (err) {
                return response.status(500).send(err);
            } else {
                createdMachineObject.__id = createdMachineObject._id;
                response.status(200).send(createdMachineObject);
            }
        });
    }

    /**
     *    @swagger
     *    /api/machine/{id}:
     *    put:
     *       summary: updates a machine
     *       description: allows to update a machine
     *       tags: [Machine]
     *       produces:
     *        - application/json
     *       parameters:
     *        - in: path
     *          name: id
     *          description: id of the machine to update
     *          required : true
     *          type: string
     *        - in: body
     *          name: body
     *          description: new data for the updated machine
     *          required : true
     *          schema:
     *              properties:
     *                  name:
     *                      type: string
     *                  ip_address:
     *                      type: string
     *                  mac_address:
     *                      type: string
     *                  comment:
     *                      type: string
     *                  is_available:
     *                      type: boolean
     *                  url_etiquette:
     *                      type: string
     *                  url_qr:
     *                      type: string
     *                  local:
     *                      type: string
     *       responses:
     *           200:
     *              description: machine updated
     *           404:
     *              description: machine not found
     *           500:
     *              description: internal error during update
     */
    @HttpPut('')
    static updateMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Machine.findById(request.params.id, (err, machine) => {
            // Handles any possible database errors
            if (err) {
                response.status(500).send(err);
            } else if (machine === null) {
                response.status(404).send();
            } else {
                // Updates each attribute with any possible attribute that may have been submitted in the body of the request.
                // If that attribute isn't in the request body, default back to whatever it was before.
                machine.name = request.body.name || machine.name;
                machine.ip_address = request.body.ip_address || machine.ip_address;
                machine.mac_address = request.body.mac_address || machine.mac_address;
                machine.comment = request.body.comment || machine.comment;
                machine.is_available = request.body.is_available || machine.is_available;
                machine.local = request.body.local || machine.local;
                machine.url_etiquette = request.body.url_etiquette || machine.url_etiquette;
                machine.url_qr = request.body.url_qr || machine.url_qr;
                // Saves the updated machine back to the database
                machine.save({}, (err2, machine2) => {
                    if (err2) {
                        response.status(500).send(err2);
                    } else if (machine2 === null) {
                        response.status(404).send();
                    } else {
                        machine2.__id = machine2._id;
                        response.status(200).send(machine2);
                    }
                });
            }
        });
    }

    /**
     *    @swagger
     *    /api/machine/{id}:
     *    delete:
     *       summary: deletes a machine
     *       description: allows to delete a machine
     *       tags: [Machine]
     *       produces:
     *        - application/json
     *       parameters:
     *        - in: path
     *          name: id
     *          description: id of the machine to update
     *          required : true
     *          type: string
     *       responses:
     *           200:
     *              description: machine deleted
     *           404:
     *              description: machine not found
     *           500:
     *              description: internal error during delete
     */
    @HttpDelete('')
    static deleteMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        // The Machine in this callback function represents the document that was found.
        // It allows you to pass a reference back to the client in case they need a reference for some reason.
        Machine.findByIdAndRemove(request.params.id, (err, machine) => {
            if (err) {
                response.status(500).send(err);
            } else if (machine === null) {
                response.status(404).send();
            } else {
                // We'll create a simple object to send back with a message and the id of the document that was removed.
                let responseMessage = {
                    message: 'Machine successfully deleted',
                    id: machine._id
                };
                response.status(200).send(responseMessage);
            }
        });
    }

}
