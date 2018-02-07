import {MachineDTO} from "../../shared/MachineDTO";
import {toFile} from 'qrcode';

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

            let body_html = "<div style='margin: 20px; width: 250px; text-align: center; float:left; border: 1px black solid;'>" +
                "<p style='width: 250px; font-size: 12px; word-break: normal; margin:0;padding:0;'>En cas de problème, scannez le QR CODE suivant</p>" +
                "<img src=\'file://" + __dirname + "/../../../../" + qr_ui + "\' style='height: 200px; width:200px; margin:0 25px; padding:0;' >" +
                "<p style='font-weight: bold; width:250px; font-size: 14px; margin: 0; padding: 0;'> local " + machine.local + " - machine " + machine.name + "</p>" +
                "</div>";
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

    public static labelGenerator(): LabelGenerator {
        return new LabelGenerator();
    }
}

export class LabelGenerator {

    private html = '';

    private promises: Promise[] = [];

    public pushItems(machines: MachineDTO[]) {
        machines.forEach(_ => this.pushItem(_));
    }

    public pushItem(machine: MachineDTO) {
        this.machines.push(machine);
        this.promises.push(new Promise((resolve, reject) => {
            Utils.generateQR(machine, form_URL_prefix, (qr_ui: string) => {
                    console.log("QR URI : " + qr_ui);

                    html += "<div style='margin: 20px; width: 250px; text-align: center; float:left; border: 1px black solid;'>" +
                        "<p style='width: 250px; font-size: 12px; word-break: normal; margin:0;padding:0;'>En cas de problème, scannez le QR CODE suivant</p>" +
                        "<img src=\'file://" + __dirname + "/../../../../" + qr_ui + "\' style='height: 200px; width:200px; margin:0 25px; padding:0;' >" +
                        "<p style='font-weight: bold; width:250px; font-size: 14px; margin: 0; padding: 0;'> local " + machine.local + " - machine " + machine.name + "</p>" +
                        "</div>";

                    resolve();
                }
            );
        }));
    }

    public build(file: string, callback: Function) {
        Promise.all(this.promises).then(() => {
            let html = createHTML({
                title: 'Reporter un problème',
                css: 'label.css',
                lang: 'en',
                head: '<meta name="description" content="example">',
                body: this.html,
            });
            let label_uri = "images/etiquettes/" + file + ".pdf";


            fs.writeFile('images/html_labels/index.html', html, function (err: any) {
                if (err) console.log(err);
                const html = fs.readFileSync('images/html_labels/index.html', 'utf8');
                const options = {format: 'Letter'};
                pdf.create(html, options).toFile(label_uri, function (err: any, res: any) {
                    if (err) return console.log(err);
                    console.log(res);
                    callback(file);

                    fs.unlinkSync('images/html_labels/index.html');
                });
            });
        });
    }

}
