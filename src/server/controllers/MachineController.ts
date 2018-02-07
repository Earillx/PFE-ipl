import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IMachineModel, MachineSchema, Machine} from '../models/schemas/Machine';
import * as mongoose from 'mongoose';

export default class MachineController extends Controller {

    static readonly URI = '/machine/:id?';

    /**
     *    @swagger
     *    /api/machine/:
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
        Machine.findById(request.body.id).then((machine: IMachineModel) => {
            // verify machine was found
            if (machine === null) {
                response.status(404).send();
                return;
            }

            // sends json response
            response.json(machine);
            next();
        }).catch(next);
    }

    /**
     *    @swagger
     *    /api/machine/:
     *    post:
     *       summary: creates a machine
     *       description: allows to create a machine
     *       tags: [Machine]
     *       produces:
     *           - application/json
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
     *                  local:
     *                      type: string
     *       responses:
     *           200:
     *              description: machine created
     *              application/json:
     *                  schema:
     *                      properties:
     *                          name:
     *                              type: string
     *                          ip_address:
     *                              type: string
     *                          mac_address:
     *                              type: string
     *                          comment:
     *                              type: string
     *                          is_available:
     *                              type: boolean
     *                          url_etiquette:
     *                              type: string
     *                          local:
     *                              type: string
     *           500:
     *              description: impossible to create a machine
     */
    @HttpPost('')
    static postMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        console.log('wtf');
        const newMachine = new Machine(request.body);
        console.log('new machine start');
        newMachine.save({}, (err, createdMachineObject) => {
            console.log('new machine save');
            if (err) {
                return response.status(500).send(err);
            }
            console.log(createdMachineObject);
            response.status(200).send(createdMachineObject);
        });
        console.log('new machine end');
    }

    /**
     *    @swagger
     *    /api/machine/:
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
                machine.is_available = request.body.is_available || machine.is_available;
                machine.local = request.body.local || machine.local;
                // Saves the updated document back to the database
                machine.save({}, (err2, machine2) => {
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
     *    /api/machine/:
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
