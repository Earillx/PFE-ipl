import {Component, OnInit} from '@angular/core';
import {MachinesProviderService} from '../../shared/services';
import {MachineDTO} from '../../../../shared/MachineDTO';

@Component({
    selector: 'app-rooms-manager',
    templateUrl: './rooms-manager.component.html',
    styleUrls: ['./rooms-manager.component.scss']
})
export class RoomsManagerComponent implements OnInit {

    public rooms: string[];
    public selectedLocal?: string = null;
    public selectedMachine?: MachineDTO = null;
    public showInactiveMachine: boolean = true;

    private _machines: MachineDTO[];

    constructor(private deviceService: MachinesProviderService) {}


    get machines(): MachineDTO[] {
        const machines = this._machines.filter((machine: MachineDTO) => {
            return (this.selectedLocal === null || machine.local === this.selectedLocal);
        });

        if (this.showInactiveMachine) {
            return machines;
        }

        return machines.filter(machine => machine.is_available);
    }

    set machines(machines: MachineDTO[]) {
        this._machines = machines;
    }

    ngOnInit() {
        // Force reload
        this.deviceService.loadMachines();
        this.deviceService.getMachines()
            .subscribe((machines: MachineDTO[]) => {
                this.machines = machines;
                this.rooms = machines
                    .map(_ => _.local)
                    .filter((value, index, array) => {
                        return array.indexOf(value) === index;
                    });
            });
    }


    selectRoom(room?: string): void {
        this.selectedLocal = room;
    }

    selectMachine(machine?: MachineDTO): void {
        this.selectedMachine = machine;
    }

}
