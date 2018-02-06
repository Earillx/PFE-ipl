import {Injectable} from '@angular/core';
import {MachineDTO} from '../../../../shared/MachineDTO';
import {ReplaySubject} from 'rxjs/src/ReplaySubject';
import { filter } from "rxjs/operators";
import { Observable } from "rxjs/src/Observable";


@Injectable()
export class MachinesProviderService {

    static mockMachines: MachineDTO[] = [
        {
            '__id': 1,
            'name': 'machine-1',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: false
        } as MachineDTO,
        {
            '__id': 2,
            'name': 'machine-2',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 3,
            'name': 'machine-3',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 4,
            'name': 'machine-4',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 5,
            'name': 'machine-5',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 6,
            'name': 'machine-6',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 7,
            'name': 'machine-7',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 8,
            'name': 'machine-8',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 9,
            'name': 'machine-9',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 10,
            'name': 'machine-10',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 11,
            'name': 'machine-11',
            'local': 'A1',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO,
        {
            '__id': 12,
            'name': 'machine-12',
            'local': 'K2',
            'comment': 'azeazeoah  ahda dua',
            isAvailable: true
        } as MachineDTO
    ];

    private _machines = new ReplaySubject<MachineDTO[]>();
    private machines$ = this._machines.asObservable();

    set machines(machines: MachineDTO[]) {
        this._machines.next(machines);
    }

    constructor() {
        this.machines = MachinesProviderService.mockMachines;
    }

    public getMachines() {
        return this.machines$;
    }

    public getMachineForLocal(local: string)  {
        return this.machines$.pipe( filter(data => {
            console.log(data);
            return true;
        }));
    }

    public updateMachines(toUpdate: MachineDTO[], toInsert: MachineDTO[], toRemove: MachineDTO[]) {
        this._machines.next(toUpdate.concat(toInsert));
    }

}
