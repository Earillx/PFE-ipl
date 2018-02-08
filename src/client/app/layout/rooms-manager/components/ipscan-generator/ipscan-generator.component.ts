import {Component, Input, OnInit} from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import {MachineDTO} from "../../../../../../shared/MachineDTO";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MachinesProviderService} from '../../../../shared/services';

const FILE_NAME: String = "ipscan";
const FILE_CONTENT_HEADER = '"IP";"Name";"MAC Address";"Comment"';

@Component({
  selector: 'app-ipscan-generator',
  templateUrl: './ipscan-generator.component.html',
  styleUrls: ['./ipscan-generator.component.css']
})

export class IpscanGeneratorComponent implements OnInit {

    @Input() local:string;

  constructor(private modalService: NgbModal,
              private machinesProvider: MachinesProviderService) { }

  ngOnInit() {
  }

    generateFile(){
        let fileContent = FILE_CONTENT_HEADER;
        let fileName = FILE_NAME + this.local + ".txt";

        this.machinesProvider.getMachinesForLocal(this.local).subscribe((currentMachines : MachineDTO[]) => {

            console.log(currentMachines);

            currentMachines.forEach((machine: MachineDTO) => {

                fileContent +='\n"' + machine.ip_address + '";"' + machine.name + '";"' + machine.mac_address + '";"' + machine.comment + '"';

            });

        });

        let file = new Blob([fileContent], { type: 'text/plain' });

        this.downloadFile(fileName, file);

    }

    private downloadFile(filename, file) {
        saveAs(file, filename);
    }

}
