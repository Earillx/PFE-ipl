import * as express from 'express';
import Controller from './Controller';
import {HttpPost} from '../utils/annotations/Routes';
import {Machine} from '../models/schemas/Machine';
import {MachineDTO} from '../../shared/MachineDTO';
import Server from '../Server';
import Utils from './Utils';


export default class MachinesController extends Controller {

    static readonly URI = '/machines';


    /**
     *   @swagger
     *   /api/machines/:
     *       post:
     *           tags: [Machines]
     *           summary: generating all qr codes for a list of machines (array of JSON)
     *           parameters:
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
     *                          local:
     *                              type: string
     *           responses:
     *               500:
     *                   description: internal error
     *               404:
     *                   not found
     *
     */
    @HttpPost('/')
    static uploadMachines(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const machinesRecieved: MachineDTO[] = request.body;
        let machinesToQR: MachineDTO[];
        const url = Server.serverAddress + 'new-problem/';
        /*
        logique traitement machine :

        si la nouvelle machine n'existe pas dans la db => insert
        si la nouvelle machine est dans la db :
            si la nouvelle machine a des champs != à celle de la db => update
            si tous les champs sont les mêmes => rien
        si il existe des machines actives dans la DB qui n'ont pas été reprises dans l'upload, les update pour les désactiver (map)
        si update machine ou insert => (re)générer qr code
         */
        Machine.find({'is_available': true}, (err, machinesAvailableInDb) => {
            // looking through each machine given to us in the request
            machinesRecieved.forEach((machine) => {
                // determining if the current machine is already in the database
                Machine.find({'mac_address': machine.mac_address}, (err2, machineFound: MachineDTO) => {
                    if (err2) {
                        return response.status(500).send(err2);
                    } else if (machineFound === null) {
                        // machine not in db => insert
                        // todo
                        // generate QR
                        Utils.generateLabel(machine, Server.serverAddress);
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
                            // there are modified fields, need to update
                            // todo

                            // generate QR
                            Utils.generateLabel(machine, Server.serverAddress);
                        }
                        // retirer la machine du le liste de celles dispo en DB (les machines non traitées seront désactivées)
                        const indexMachine = machinesAvailableInDb.indexOf(machinesAvailableInDb.find((machinePred) =>
                            machinePred.mac_address === machine.mac_address));
                        if (indexMachine > -1) {
                            machinesAvailableInDb.splice(indexMachine, 1);
                        }
                    }
                });
            });
            // disable all machines that weren't mentionned
            machinesAvailableInDb.forEach((machinToDisable) => {
                // todo
            });
        });
    }

}
