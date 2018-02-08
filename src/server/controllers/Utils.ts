import {MachineDTO} from "../../shared/MachineDTO";
import {toFile} from 'qrcode';
import {VALIDATION_ERROR_MESSAGE_LENGTH} from "../../shared/Constants";

const createHTML = require('create-html');
const fs = require('fs');
const pdf = require('html-pdf');


export default class Utils {


    public static generateQR(machine: MachineDTO, form_url_prefix: string, callback: Function) {
        // generate QR
        let encodedText = form_url_prefix + machine.name;
        let QR_URI = 'images/qr/' + machine.name + machine.local + '.png';
        toFile(QR_URI, encodedText).then(() => {
            console.log("QR CODE créé VERS URL : " + encodedText);
            callback(QR_URI);

        });
    }

    public static generateLabel(machine: MachineDTO, serverAddress: string, callback: Function) {
        let form_URL_prefix = serverAddress + 'new-problem/';
        Utils.generateQR(machine, form_URL_prefix, (qr_ui: string) => {
            console.log("QR URI : " + qr_ui);

            let body_html = "" +
                "<h1>" + machine.name + "</h1>" +
                "<h3>En cas de problème, scannez le QR CODE suivant</h3>" +
                "<img src=\'file://" + __dirname + "/../../../../" + qr_ui + "\' height=\"200\" width=\"200\" >";
            let html = createHTML({
                title: 'Reporter un problème',
                css: 'label.css',
                lang: 'en',
                head: '<meta name="description" content="example">',
                body: body_html,
            });
            let label_uri = "images/etiquettes/" + machine.name + ".pdf";

            fs.writeFile('images/html_labels/index.html', html, function (err: any) {
                if (err) console.log(err);
                const html = fs.readFileSync('images/html_labels/index.html', 'utf8');
                const options = {format: 'Letter'};
                pdf.create(html, options).toFile(label_uri, function (err: any, res: any) {
                    if (err) return console.log(err);
                    console.log(res);
                    callback([qr_ui, label_uri])

                    fs.unlinkSync('images/html_labels/index.html');
                });
            });


        });


    }

    public static formatValidationErrorToFront(error : any): string{
        let errorMessageContent = error.toString();
        return errorMessageContent.substring(VALIDATION_ERROR_MESSAGE_LENGTH);
    }

}
