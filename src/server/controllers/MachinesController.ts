import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPost} from '../utils/annotations/Routes';
import {Machine} from '../models/schemas/Machine';
import {MachineDTO} from '../../shared/MachineDTO';
import Server from '../Server';
import Utils from './Utils';
import Any = jasmine.Any;
import {log_type_strings, log_types} from "../../shared/LogDTO";
import {Log} from '../models/schemas/Log';



export default class MachinesController extends Controller {

    static readonly URI = '/machines';

    /**
     *    @swagger
     *    /api/machines/:
     *    get:
     *       summary: get all machines
     *       description: allows to retrieve all machines
     *       tags: [Machines]
     *       produces:
     *        - application/json
     *       responses:
     *          200:
     *              description: machines found
     *          404:
     *              description: machines not found
     */
    @HttpGet('')
    static getMachine(request: express.Request, response: express.Response, next: express.NextFunction): void {
        Machine.find({}, (err, machinesFound) => {
            if (machinesFound === null) {
                response.status(404).send();
            } else {
                for (let i = 0; i < machinesFound.length; i++) {
                    machinesFound[i] = machinesFound[i].toObject();
                    machinesFound[i].__id = machinesFound[i]._id;
                }
                response.status(200).send(machinesFound);
            }
        });
    }


    /**
     *   @swagger
     *   /api/machines/{local}:
     *       post:
     *           tags: [Machines]
     *           summary: generating all qr codes for a list of machines (array of JSON)
     *           parameters:
     *            - in: path
     *              name: local
     *              description: local of the machines
     *              required: true
     *              type: string
     *            - in: body
     *              name: machines data
     *              schema:
     *                  type: array
     *                  items:
     *                      type: object
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
     *                          url_qr:
     *                              type: string
     *                          local:
     *                              type: string
     *           responses:
     *               500:
     *                   description: internal error
     *               404:
     *                   not found
     *
     */
    @HttpPost('/:local')
    static uploadMachines(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const localReceived: string = request.params.local;
        const machinesRecieved: MachineDTO[] = request.body;

        const updateDumper = Utils.labelGenerator(Server.serverAddress);
        const localDumper = Utils.labelGenerator(Server.serverAddress);

        let insertedMachines: MachineDTO[] = [];
        let updatedMachines: MachineDTO[] = [];
        let disabledMachines: MachineDTO[] = [];
        let insertedAndUpdatedMachines: MachineDTO[] = [];
        let promises: Promise<Any>[] = [];
        /*
        logique traitement machine :

        si la nouvelle machine n'existe pas dans la db => insert
        si la nouvelle machine est dans la db :
            si la nouvelle machine a des champs != à celle de la db => update
            si tous les champs sont les mêmes => rien
        si il existe des machines actives dans la DB qui n'ont pas été reprises dans l'upload, les update pour les désactiver (map)
        si update machine ou insert => (re)générer qr code
         */
        Machine.find({'is_available': true, 'local': localReceived}, (err, machinesAvailableInDb) => {
            // looking through each machine given to us in the request
            machinesRecieved.forEach((machine) => {
                promises.push(new Promise((resolve, reject) => {
                    // determining if the current machine is already in the database
                    Machine.find({'name': machine.name}, (err2, result) => {
                        const machineFound = result != null && result.length > 0 ? result[0] : null;
                        if (err2) {
                            return response.status(500).send(err2);
                        } else if (machineFound === null) {
                            // machine not in db => INSERT
                            const newMachine = new Machine();
                            newMachine.name = machine.name;
                            newMachine.ip_address = machine.ip_address;
                            newMachine.mac_address = machine.mac_address;
                            newMachine.comment = machine.comment;
                            newMachine.is_available = machine.is_available;
                            newMachine.local = machine.local;
                            localDumper.pushItem(newMachine);
                            updateDumper.pushItem(newMachine);
                            // generate QR+label
                            updateDumper.build(request.params.local + '/' + newMachine.name, (label_uri: string, qr_uri: string) => {
                                newMachine.url_etiquette = label_uri;
                                newMachine.url_qr = qr_uri;
                                // creating log
                                const newLog = new Log();
                                newLog.type = log_types[0];
                                newLog.description = log_type_strings[newLog.type];
                                newLog.date = Date.now().toString();
                                newMachine.logs.push(newLog);

                                // Saves the new machine to the database
                                newMachine.save({}, (err3, insertedMachine) => {
                                    if (err3) {
                                        return response.status(500).send(err3);
                                    }
                                    insertedMachine = insertedMachine.toObject();
                                    insertedMachine.__id = insertedMachine._id;
                                    console.log("HUSQHDBIQDIQ");
                                    console.log(insertedMachine);
                                    insertedMachines.push(insertedMachine);
                                    insertedAndUpdatedMachines.push(insertedMachine);
                                    // updateDumper.pushItem(insertedMachine);
                                    // localDumper.pushItem(insertedMachine);
                                    resolve();
                                });
                            });
                        } else {
                            // machine in db
                            if (machine.mac_address !== machineFound.mac_address ||
                                machine.local !== machineFound.local ||
                                machine.name !== machineFound.name ||
                                machine.url_etiquette !== machineFound.url_etiquette ||
                                machine.comment !== machineFound.comment ||
                                machine.ip_address !== machineFound.ip_address ||
                                machine.is_available !== machineFound.is_available ||
                                machine.url_qr !== machineFound.url_qr) {
                                // there are modified fields, need to UPDATE the found db object with the new data
                                machineFound.ip_address = machine.ip_address || machineFound.ip_address;
                                machineFound.mac_address = machine.mac_address || machineFound.mac_address;
                                machineFound.comment = machine.comment || machineFound.comment;
                                machineFound.is_available = machine.is_available || machineFound.is_available;
                                machineFound.local = machine.local || machineFound.local;
                                localDumper.pushItem(machineFound);
                                updateDumper.pushItem(machineFound);
                                // generate QR+label
                                updateDumper.build(request.params.local + '/' + machineFound.name, (label_uri: string, qr_uri: string) => {
                                    machineFound.url_etiquette = machine.url_etiquette || machineFound.url_etiquette;
                                    machineFound.url_qr = machine.url_qr || machineFound.url_qr;
                                    // Saves the updated machine back to the database
                                    // creating log
                                    const newLog = new Log();
                                    newLog.type = log_types[0];
                                    newLog.description = log_type_strings[newLog.type];
                                    newLog.date = Date.now().toString();
                                    machineFound.logs.push(newLog);

                                    machineFound.save({}, (err4, updatedMachine) => {
                                        if (err4) {
                                            return response.status(500).send(err4);
                                        } else {
                                            updatedMachine = updatedMachine.toObject();
                                            updatedMachine.__id = updatedMachine._id;
                                            updatedMachines.push(updatedMachine);
                                            insertedAndUpdatedMachines.push(updatedMachine);
                                            resolve();
                                        }
                                    });
                                });
                            }
                            // retirer la machine du le liste de celles dispo en DB (les machines non traitées seront désactivées)
                            const indexMachine = machinesAvailableInDb
                                .indexOf(machinesAvailableInDb
                                    .find((machinePred) => machinePred.name === machine.name));
                            if (indexMachine > -1) {
                                machinesAvailableInDb.splice(indexMachine, 1);
                            }
                        }
                    });

                }));
            });
            Promise.all(promises).then(value => {
                // disable all machines that weren't mentionned
                let promises2: Promise<Any>[] = [];
                localDumper.build(request.params.local + '/all', (label_uri: string, qr_uri: string) => {
                    console.log('localDumper: label uri and qr uri :' + label_uri + qr_uri + 'params.local : ' + request.params.local)
                    machinesAvailableInDb.forEach((machineToDisable) => {
                        promises2.push(new Promise((resolve, reject) => {
                            Machine.find({'name': machineToDisable.name}, (err2, result) => {
                                if (err2) {
                                    return response.status(500).send(err2);
                                } else {
                                    const disabledMachine = result[0];
                                    disabledMachine.is_available = false;
                                    // creating log
                                    const newLog = new Log();
                                    newLog.type = log_types[1];
                                    newLog.description = log_type_strings[newLog.type];
                                    newLog.date = Date.now().toString();
                                    disabledMachine.logs.push(newLog);

                                    disabledMachine.save({}, (err3, updatedDisabledMachine) => {
                                        updatedDisabledMachine = updatedDisabledMachine.toObject();
                                        disabledMachines.push(updatedDisabledMachine);
                                        resolve();
                                    });
                                }
                            });

                        }));
                    });
                    Promise.all(promises2).then(value2 => {
                        // for (let i = 0; i < insertedAndUpdatedMachines.length; i++) {
                        //     insertedAndUpdatedMachines[i] = <Object>insertedAndUpdatedMachines[i];
                        //     insertedAndUpdatedMachines[i].__id = insertedAndUpdatedMachines[i]._id;
                        // }
                        response.status(200).send(insertedMachines.concat(insertedAndUpdatedMachines));
                    });
                });
            });
        });
    }


}
