import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IMachineModel, MachineSchema, Machine} from '../models/schemas/Machine';
import * as mongoose from 'mongoose';
import {toFile} from 'qrcode';
import {MachineDTO} from '../../shared/MachineDTO';
import {forEach} from "@angular/router/src/utils/collection";
import Server from "../Server";

/**
 *    @swagger
 *    /api/machines/:
 *      get:
 *          summary: quick test method
 *      post:
 *          summary: generating all qr codes for a list of machines (array of JSON)
 *          parameters:
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
 *                          isAvailable:
 *                              type: boolean
 *                          url_etiquette:
 *                              type: string
 *                          local:
 *                              type: string
 *
 *
 */
export default class MachinesController extends Controller {

    static readonly URI = '/machines';

    @HttpGet('/')
    static getMachines(request: express.Request, response: express.Response, next: express.NextFunction): void {
        console.log('qr method started');
        toFile('images/qr/testQR', 'http://naver.com').then(() => {
            console.log('qr printed');
            response.status(200).send();
        });
        console.log('qr method done');
    }

    @HttpPost('/')
    static uploadMachines(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const machines: MachineDTO[] = request.body;
        const url = Server.serverAddress + 'new-problem/';
        machines.forEach((machine) => {
            const encodedText = url + machine.name
            console.log(encodedText);
            toFile('images/qr/' + machine.name + '.png', encodedText).then(() => {
                response.status(200).send();
            });
        });
    }



}
