import { Component, OnInit } from '@angular/core';
import {MachinesProviderService} from '../../shared/services';
import {MachineDTO} from '../../../../shared/MachineDTO';

@Component({
  selector: 'app-rooms-manager',
  templateUrl: './rooms-manager.component.html',
  styleUrls: ['./rooms-manager.component.scss']
})
export class RoomsManagerComponent implements OnInit {

    public rooms: string[];

    public machines: MachineDTO[];

    public selectedLocal?: string = null;

    public selectedMachine: MachineDTO;

    constructor(private deviceService: MachinesProviderService) { }

    ngOnInit() {
        this.deviceService.getMachines()
            .subscribe((machines: MachineDTO[]) => {
                this.machines = machines;
                this.rooms = this.machines
                    .map(_ => _.local)
                    .filter((value, index, array) => {
                        return array.indexOf(value) === index;
                    });
            });
    }


    selectRoom(room?: string): void {
        this.selectedLocal = room;
    }

    selectMachine(machine: MachineDTO): void {
        this.selectedMachine = machine;
    }

}
