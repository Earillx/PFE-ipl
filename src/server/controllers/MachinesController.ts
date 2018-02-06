import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IMachineModel, MachineSchema, Machine} from '../models/schemas/Machine';
import * as mongoose from 'mongoose';
import {toFile} from 'qrcode';

export default class MachinesController extends Controller {

    static readonly URI = '/machines';

    /**
     *    @swagger
     *    /api/machines:
     *      get:
     *
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


}
