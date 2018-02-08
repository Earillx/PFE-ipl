import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MachinesProviderService} from '../../../../shared/services';
import {MachineDTO} from '../../../../../../shared/MachineDTO';


const IP_REGEX: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const MAC_REGEX: RegExp = /^(([A-Fa-f0-9]{2}[:\-]){5}[A-Fa-f0-9]{2}[,]?)+$/;

export enum STATE {
    UNUSED,
    READING,
    ERROR,
    SUCCESS,
    UPLOADED
}

@Component({
    selector: 'app-room-loader',
    templateUrl: './room-loader.component.html',
    styleUrls: ['./room-loader.component.scss']
})
export class RoomLoaderComponent implements OnInit {

    @ViewChild('inputfile') inputfile;

    readonly STATE = STATE;

    analyzed = {
        toRemove: [],
        toUpdate: [],
        toInsert: []
    };

    showDetails: boolean = false;

    status: number = STATE.UNUSED;

    error?: string = null;

    private local: string;

    constructor(private modalService: NgbModal,
                private machinesProvider: MachinesProviderService) {
    }

    ngOnInit() {
    }

    analyzeFile(file) {
        const reader: FileReader = new FileReader();
        this.resetState();
        this.status = STATE.READING;

        if (!file.files || file.files.length !== 1) {
            this.status = this.STATE.ERROR;
            this.error = 'Vous devez sélectionner un fichier';

            return;
        }

        try {
            const filename = file.files[0].name;
            const parser: string[] = filename.match(/ipscan([^\.]+).txt/);

            if (parser === null || parser.length < 2) {
                throw 'Le nom du fichier ne permet pas de déterminer le local, attendu : ipscan{$nom-local}.txt';
            }

            this.local = parser[1];
            let content = '';
            reader.onload = (ev: Event) => {
                content = reader.result;
                this.parseContent(content);
            };

            reader.readAsText(file.files[0]);
        } catch (e) {
            this.error = e.message || e;
            this.status = this.STATE.ERROR;
        }
    }

    parseContent(content: string) {
        let lines: string[] = content.split('\n');
        lines.shift();
        lines.pop();

        const devices: MachineDTO[] = lines
            .filter((value: string) => {
                return value && value.length > 0;
            }).map((line: string, index: number) => {
                const values: string[] = line
                    .split(';')
                    .map((value: string) => {
                        return value
                            .replace(/^[\s'"]+/, '')
                            .replace(/[\s'"]+$/, '');
                    });

                if (values.length !== 4) {
                    throw 'Malformatted input at line ' + (index + 1) + ' with value ' + values.join(',');
                }

                if (!IP_REGEX.test(values[0])) {
                    throw 'Malformatted IP address at line ' + (index + 1) + ' with value ' + values[0];
                }

                if (!MAC_REGEX.test(values[2])) {
                    throw 'Malformatted MAC address at line ' + (index + 1) + ' with value ' + values[2];
                }

                return {
                    name: values[1],
                    ip_address: values[0],
                    mac_address: values[2],
                    is_available: true,
                    local: this.local,
                    comment: values[3]
                } as MachineDTO;
            });

        this.sortMachines(devices);
    }

    applyChanges() {
        this.machinesProvider.updateMachines(
            this.local,
            this.analyzed.toUpdate,
            this.analyzed.toInsert,
            this.analyzed.toRemove
        ).subscribe((err?: Response) => {
            if (err === null) {
                this.resetState();
                this.status = STATE.UPLOADED;
            } else {
                this.status = STATE.ERROR;
                this.error = err.message;
            }
        });

    }

    toggleDetails() {
        this.showDetails = !this.showDetails;
    }

    open(content) {
        this.modalService.open(content, {
            size: 'lg',
            backdrop: true
        }).result.then((result) => {
            this.resetState();
        }, (reason) => {
            this.resetState();
        });
    }

    public resetState() {
        this.local = '';
        this.analyzed = {
            toRemove: [],
            toUpdate: [],
            toInsert: []
        };
        this.showDetails = false;
        this.status = this.STATE.UNUSED;
        this.error = '';
    }

    private sortMachines(machines: MachineDTO[]): void {
        this.machinesProvider.getMachinesForLocal(this.local).subscribe((currentMachines: MachineDTO[]) => {
            this.analyzed = {
                toInsert: [],
                toUpdate: [],
                toRemove: []
            };
            const currentMachinesId = currentMachines.map(_ => _.name);

            machines.forEach((machine: MachineDTO) => {
                let index = currentMachinesId.indexOf(machine.name);
                if (index === -1) {
                    this.analyzed.toInsert.push(machine);
                } else {
                    this.analyzed.toUpdate.push(machine);
                    currentMachinesId.splice(index, 1);
                }
            });

            this.analyzed.toRemove = currentMachines.filter((machine: MachineDTO) => {
                return currentMachinesId.indexOf(machine.name) !== -1;
            });

            this.error = '';
            this.status = this.STATE.SUCCESS;
        });
    }

}
