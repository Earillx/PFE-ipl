import {Component, OnInit} from '@angular/core';
import {MachinesProviderService} from '../../shared/services';
import {MachineDTO} from '../../../../shared/MachineDTO';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-rooms-manager',
  templateUrl: './rooms-manager.component.html',
  styleUrls: ['./rooms-manager.component.scss']
})
export class RoomsManagerComponent implements OnInit {

    public rooms: string[];

    private _machines: MachineDTO[];

    set machines(machines: MachineDTO[]) {
        this._machines = machines;
    }
    get machines(): MachineDTO[] {
        const machines = this._machines.filter((machine: MachineDTO) => {
            return (this.selectedLocal === null || machine.local === this.selectedLocal);
        });

        if (this.showInactiveMachine) {
            return machines;
        }

        return machines.filter(machine => machine.is_available);
    }

    public selectedLocal?: string = null;

    public selectedMachine?: MachineDTO = null;

    public showInactiveMachine: boolean = true;

    constructor(private deviceService: MachinesProviderService) { }

    ngOnInit() {
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
