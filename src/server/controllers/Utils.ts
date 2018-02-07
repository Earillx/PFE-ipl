import {MachineDTO} from "../../shared/MachineDTO";
import {Machine} from '../models/schemas/Machine';
import {toFile} from 'qrcode';

export default class Utils{


    public static generateQR(machine:MachineDTO, form_url_prefix:string){
       // generate QR
       let encodedText = form_url_prefix + machine.name;
       let QR_URI = 'images/qr/' + machine.name + machine.local + '.png';
       toFile(QR_URI, encodedText).then(() => {
           console.log("QR CODE créé VERS URL : "+encodedText);
       });
       return QR_URI;
   }

   public static generateLabel(machine:MachineDTO, serverAddress:string):string{
        let form_URL_prefix =serverAddress + 'new-problem/';
        let qr_uri =Utils.generateQR(machine,form_URL_prefix );
        return qr_uri;

   }
}
