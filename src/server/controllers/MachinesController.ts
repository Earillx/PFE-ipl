import * as express from 'express';
import Controller from './Controller';
import {HttpGet, HttpPut, HttpPost, HttpDelete} from '../utils/annotations/Routes';
import {IMachineModel, MachineSchema, Machine} from '../models/schemas/Machine';
import * as mongoose from 'mongoose';
import {QRCode} from 'qrcode';

export default class MachinesController extends Controller {

    static readonly URI = '/machines/';

    /**
     *    @swagger
     *    /api/machines:
     *
     */
    @HttpGet('')
    static getMachines(request: express.Request, response: express.Response, next: express.NextFunction): void {
        const qrCode = new QRCode();
        qrCode.makeCode('http://naver.com');
        console.log(qrCode);
        response.status(200).send(qrCode);
    }


}
