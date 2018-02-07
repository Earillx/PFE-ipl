import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPost} from '../utils/annotations/Routes';
import {Machine} from '../models/schemas/Machine';
import {toFile} from 'qrcode';
import {MachineDTO} from '../../shared/MachineDTO';
import Server from '../Server';


export default class MachinesController extends Controller {

    static readonly URI = '/machines';

    /**
     *    @swagger
     *    /api/machines/:
     *      get:
     *          tags: [Machines]
     *          summary: quick test method to generate a qr code
     */
    @HttpGet('/')
    static getMachines(request: express.Request, response: express.Response, next: express.NextFunction): void {
        console.log('qr method started');
        toFile('images/qr/testQR', 'http://naver.com').then(() => {
            console.log('qr printed');
            response.status(200).send();
        });
        console.log('qr method done');
    }

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
        let machinesAvailableInDB: MachineDTO;
        Machine.find({'is_available': true}, (err, result) => {
            /*machinesAvailableInDB = result;

            machinesRecieved.forEach((machine) => {
                Machine.findOne({'mac_address': machine.mac_address});
                Machine.findById(machine._})
                // generate QR
                const encodedText = url + machine.name;
                console.log(encodedText);
                toFile('images/qr/' + machine.name + machine.local + '.png', encodedText).then(() => {
                    response.status(200).send();
                });
            });*/
        });
    }


}
