import {MachineDTO} from '../../shared/MachineDTO';
import {toFile} from 'qrcode';
import {VALIDATION_ERROR_MESSAGE_LENGTH} from "../../shared/Constants";

const createHTML = require('create-html');
const fs = require('fs');
const pdf = require('html-pdf');
const randomstring = require('randomstring');
const base64Img = require('base64-img');


export default class Utils {

    public static generateImageFromBase64(base64: string, callback: Function) {

        let path = __dirname + '/../../../../images/problemes';
        let filename = randomstring.generate();
        base64Img.img(base64, path, filename, (err: any, filepath: string) => {
            callback('problemes/' + filename + '.' + filepath.split('.').pop());
        });
    }


    public static generateQR(machine: MachineDTO, form_url_prefix: string, callback: Function) {
        // generate QR
        let encodedText = form_url_prefix + machine.__id;
        let QR_URI = 'images/qr/' + machine.local + '/' + machine.name + '.png';
        if (!fs.existsSync('images/qr/' + machine.local)) {
            fs.mkdirSync('images/qr/' + machine.local);
        }
        if (!fs.existsSync('images/etiquettes/' + machine.local)) {
            fs.mkdirSync('images/etiquettes/' + machine.local);
        }

        toFile(QR_URI, encodedText).then(() => {
            console.log('QR CODE créé VERS URL : ' + encodedText);
            callback(QR_URI);
        });
    }

    public static generateLabel(machine: MachineDTO, serverAddress: string, callback: Function) {
        let form_URL_prefix = serverAddress + 'new-problem/';
        Utils.generateQR(machine, form_URL_prefix, (qr_ui: string) => {
            console.log('QR URI : ' + qr_ui);

            let body_html = `<div style='margin: 20px; width: 250px; text-align: center; float:left; border: 1px black solid;'><p style='width: 250px; font-size: 12px; word-break: normal; margin:0;padding:0;'>En cas de problème, scannez le QR CODE suivant</p><img src='file://${__dirname}/../../../../${qr_ui}' style='height: 200px; width:200px; margin:0 25px; padding:0;' ><p style='font-weight: bold; width:250px; font-size: 14px; margin: 0; padding: 0;'> local ${machine.local} - machine ${machine.name}</p></div>`;
            let html = createHTML({
                title: 'Reporter un problème',
                css: 'label.css',
                lang: 'en',
                head: '<meta name=\'description\' content=\'example\'>',
                body: body_html,
            });
            let label_uri = 'images/etiquettes/' + machine.local + '/' + machine.name + '.pdf';
            fs.writeFile('images/html_labels/index.html', html, function (err: any) {
                if (err) {
                    console.log(err);
                }
                const html = fs.readFileSync('images/html_labels/index.html', 'utf8');
                const options = {format: 'Letter'};
                pdf.create(html, options).toFile(label_uri, function (err: any, res: any) {
                    if (err) return console.log(err);
                    console.log(res);
                    callback([qr_ui, label_uri]);

                    if (fs.existsSync('images/html_labels/index.html')) {
                        fs.unlinkSync('images/html_labels/index.html');
                    }
                });
            });
        });

    }

    public static labelGenerator(serverAddress: string): LabelGenerator {
        return new LabelGenerator(serverAddress);
    }

    public static formatValidationErrorToFront(error : any): string{
        let errorMessageContent = error.toString();
        return errorMessageContent.substring(VALIDATION_ERROR_MESSAGE_LENGTH);
    }

    public static isValidMongooseObjectId(id : string): boolean{
        if(id.match(/^[0-9a-fA-F]{24}$/))
            return true;
        return false;
    }

}

export class LabelGenerator {

    private serverAddress: string;

    private html = '';

    private promises: Promise<String>[] = [];

    constructor(serverAddress: string) {
        this.serverAddress = serverAddress;
    }

    public pushItems(machines: MachineDTO[]) {
        machines.forEach(_ => this.pushItem(_));

        return this;
    }

    public pushItem(machine: MachineDTO) {
        this.promises.push(new Promise<String>((resolve, reject) => {
            let form_URL_prefix = this.serverAddress + 'new-problem/';
            Utils.generateQR(machine, form_URL_prefix, (qr_ui: string) => {
                    console.log('QR URI : ' + qr_ui);
                    this.html += `<div style='margin: 20px; width: 250px; text-align: center; float:left; border: 1px black solid;'><p style='width: 250px; font-size: 12px; word-break: normal; margin:0;padding:0;'>En cas de problème, scannez le QR CODE suivant</p><img src='file://${__dirname}/../../../../${qr_ui}' style='height: 200px; width:200px; margin:0 25px; padding:0;' ><p style='font-weight: bold; width:250px; font-size: 14px; margin: 0; padding: 0;'> local ${machine.local} - machine ${machine.name}</p></div>`;
                    resolve(qr_ui);
                }
            );
        }));

        return this;
    }

    private reset() {
        this.html = '';

        this.promises = [];
    }


    public build(file: string, callback: Function) {
        Promise.all(this.promises).then(() => {
            let html = createHTML({
                title: 'Reporter un problème',
                css: 'label.css',
                lang: 'en',
                head: '<meta name=\'description\' content=\'example\'>',
                body: this.html,
            });
            let label_uri = 'images/etiquettes/' + file + '.pdf';
            let qr_uri = 'images/qr/' + file + '.png';

            const randomString = randomstring.generate();
            const path = 'images/html_labels/index-' + randomString + '.html';

            fs.writeFile(path, html, function (err: any) {
                if (err) {
                    console.log(err);
                }
                // creating parent dir if needed
                if (!fs.existsSync('images/html_labels/')) {
                    fs.mkdirSync('images/html_labels/');
                }
                const html: Buffer = fs.readFileSync('images/html_labels/index-' + randomString + '.html', 'utf8');
                const options = {format: 'Letter'};
                pdf.create(html, options).toFile(label_uri, function (err: any, res: any) {
                    if (err) return console.log(err);
                    callback(res.filename, qr_uri);
                    fs.unlinkSync('images/html_labels/index-' + randomString + '.html');
                });
            });
            this.reset();
        });
    }

}
